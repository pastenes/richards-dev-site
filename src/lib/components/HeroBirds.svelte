<script lang="ts">
	// A small flock (boids) over Trillium Lake, drawn on a 2D canvas. It replaces the old Vanta.js
	// birds. Decorative only.
	// - The simulation runs in the landscape's viewBox units (0 -240 960 600, xMaxYMax slice), so the
	//   flight band stays above the lake at every aspect ratio.
	// - Birds scatter from a nearby pointer, then regroup.
	// - The canvas sits between the back and front landscape SVGs and moves with the lake's layer
	//   (k 100), so the flock passes behind the nearest trees.
	// - Slow cruising and wingbeats keep it calm; only a scare speeds it up.
	// - It only animates while the hero is on screen and the tab is visible; under reduced motion it
	//   isn't rendered.
	import { MediaQuery } from 'svelte/reactivity';

	type Props = {
		progress: number;
		pointer: { x: number; y: number };
		drift: { x: number; y: number };
	};
	let { progress, pointer, drift }: Props = $props();

	const reduceMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	const lightScheme = new MediaQuery('(prefers-color-scheme: light)');

	// Layer placement, matching HeroLandscape's `drift(k, depth)`.
	const K = 100;
	const DEPTH = 0.55;

	// Flight band (viewBox y): from below the summit (about 62) down to just over the water (shore at
	// about 242).
	const BAND_TOP = 100;
	const BAND_BOTTOM = 250;

	// Speeds in viewBox units per second; distances in viewBox units.
	const MIN_SPEED = 14;
	const MAX_SPEED = 28;
	const FLEE_SPEED = 90;
	const NEIGHBOR = 45;
	const SEPARATION = 14;
	const FLEE_RADIUS_PX = 130;

	type Bird = { x: number; y: number; vx: number; vy: number; z: number; phase: number; flap: number };

	let canvas = $state<HTMLCanvasElement>();
	let color = '#a4ffeb';

	// Re-read the color whenever the system theme flips (the token changes in the light block).
	$effect(() => {
		void lightScheme.current;
		if (canvas) color = getComputedStyle(canvas).color;
	});

	$effect(() => {
		const el = canvas;
		if (!el) return;
		const ctx = el.getContext('2d');
		if (!ctx) return;

		let width = 0;
		let height = 0;
		let scale = 1;
		let offsetX = 0;
		let offsetY = 0;
		let birds: Bird[] = [];

		// Pointer in canvas pixels (null when it's away).
		let pointerPx: { x: number; y: number } | null = null;

		const visibleRange = () => ({ min: -offsetX / scale, max: (width - offsetX) / scale });

		function spawn(count: number) {
			const { min, max } = visibleRange();
			const heading = Math.random() < 0.5 ? -1 : 1;
			birds = Array.from({ length: count }, () => {
				const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
				return {
					x: min + Math.random() * (max - min),
					y: BAND_TOP + Math.random() * (BAND_BOTTOM - BAND_TOP),
					vx: heading * speed,
					vy: (Math.random() - 0.5) * 6,
					z: Math.random(),
					phase: Math.random() * Math.PI * 2,
					flap: 3.2 + Math.random() * 1.4
				};
			});
		}

		function resize() {
			const rect = el!.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			el!.width = Math.round(width * dpr);
			el!.height = Math.round(height * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			// Same mapping as preserveAspectRatio="xMaxYMax slice" on the 960 x 600 viewBox.
			scale = Math.max(width / 960, height / 600);
			offsetX = width - 960 * scale;
			offsetY = height - 600 * scale;
			const count = width < 768 ? 20 : 40;
			if (birds.length !== count) spawn(count);
		}

		// Where the layer currently sits (scroll parallax + pointer drift), in pixels.
		const layerShift = () => ({
			x: -pointer.x * drift.x * DEPTH * scale,
			y: -(progress * K + pointer.y * drift.y * DEPTH) * scale
		});

		function step(dt: number) {
			const { min, max } = visibleRange();
			const shift = layerShift();
			const flee = pointerPx && {
				x: (pointerPx.x - shift.x - offsetX) / scale,
				y: (pointerPx.y - shift.y - offsetY) / scale - 240,
				r: FLEE_RADIUS_PX / scale
			};

			for (const b of birds) {
				let ax = 0;
				let ay = 0;
				let alignX = 0;
				let alignY = 0;
				let centerX = 0;
				let centerY = 0;
				let n = 0;
				for (const o of birds) {
					if (o === b) continue;
					const dx = o.x - b.x;
					const dy = o.y - b.y;
					const d2 = dx * dx + dy * dy;
					if (d2 > NEIGHBOR * NEIGHBOR) continue;
					n++;
					alignX += o.vx;
					alignY += o.vy;
					centerX += o.x;
					centerY += o.y;
					if (d2 < SEPARATION * SEPARATION && d2 > 0) {
						const d = Math.sqrt(d2);
						ax -= (dx / d) * (SEPARATION - d) * 6;
						ay -= (dy / d) * (SEPARATION - d) * 6;
					}
				}
				if (n) {
					ax += (alignX / n - b.vx) * 0.9;
					ay += (alignY / n - b.vy) * 0.9;
					ax += (centerX / n - b.x) * 0.5;
					ay += (centerY / n - b.y) * 0.5;
				}

				// Soft walls above and below the band, plus a little wander.
				if (b.y < BAND_TOP) ay += (BAND_TOP - b.y) * 2;
				if (b.y > BAND_BOTTOM) ay -= (b.y - BAND_BOTTOM) * 2;
				ay += (Math.random() - 0.5) * 10;

				let fleeing = false;
				if (flee) {
					const dx = b.x - flee.x;
					const dy = b.y - flee.y;
					const d = Math.hypot(dx, dy);
					if (d < flee.r && d > 0) {
						const push = (1 - d / flee.r) * 900;
						ax += (dx / d) * push;
						ay += (dy / d) * push;
						fleeing = true;
					}
				}

				b.vx += ax * dt;
				b.vy += ay * dt;
				const speed = Math.hypot(b.vx, b.vy);
				const top = fleeing ? FLEE_SPEED : MAX_SPEED;
				const clamped = Math.min(top, Math.max(MIN_SPEED, speed));
				if (speed > 0) {
					// Ease back down to cruising speed after a scare.
					const target = speed > top ? speed + (clamped - speed) * Math.min(1, dt * 2) : clamped;
					b.vx = (b.vx / speed) * target;
					b.vy = (b.vy / speed) * target;
				}
				b.x += b.vx * dt;
				b.y += b.vy * dt;
				b.phase += dt * (b.flap + (fleeing ? 5 : 0));

				// Wrap around the visible width, with a margin so birds leave the frame before reappearing.
				if (b.x > max + 20) b.x = min - 20;
				else if (b.x < min - 20) b.x = max + 20;
			}
		}

		function draw() {
			ctx!.clearRect(0, 0, width, height);
			const shift = layerShift();
			ctx!.strokeStyle = color;
			ctx!.lineCap = 'round';
			ctx!.lineJoin = 'round';
			for (const b of birds) {
				const x = b.x * scale + offsetX + shift.x;
				const y = (b.y + 240) * scale + offsetY + shift.y;
				// Half wingspan in px: farther birds (low z) are smaller and fainter.
				const s = (2.5 + b.z * 4) * Math.max(0.8, scale / 1.3);
				const lift = Math.sin(b.phase); // -1 (wings down) .. 1 (wings up)
				const tip = s * (0.15 + 0.55 * lift);
				const tilt = Math.max(-0.35, Math.min(0.35, b.vy / MAX_SPEED)) * Math.sign(b.vx || 1);
				ctx!.globalAlpha = 0.45 + b.z * 0.5;
				ctx!.lineWidth = 0.9 + b.z * 0.8;
				ctx!.save();
				ctx!.translate(x, y);
				ctx!.rotate(tilt);
				ctx!.beginPath();
				ctx!.moveTo(-s, -tip);
				ctx!.quadraticCurveTo(-s * 0.45, -tip * 0.15 - s * 0.25, 0, 0);
				ctx!.quadraticCurveTo(s * 0.45, -tip * 0.15 - s * 0.25, s, -tip);
				ctx!.stroke();
				ctx!.restore();
			}
			ctx!.globalAlpha = 1;
		}

		let frame = 0;
		let last = 0;
		let onScreen = true;

		function tick(now: number) {
			const dt = Math.min(0.05, (now - last) / 1000 || 0);
			last = now;
			step(dt);
			draw();
			frame = requestAnimationFrame(tick);
		}

		function sync() {
			const run = onScreen && document.visibilityState === 'visible';
			if (run && !frame) {
				last = performance.now();
				frame = requestAnimationFrame(tick);
			} else if (!run && frame) {
				cancelAnimationFrame(frame);
				frame = 0;
			}
		}

		function onPointerMove(event: PointerEvent) {
			if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
			const rect = el!.getBoundingClientRect();
			pointerPx = { x: event.clientX - rect.left, y: event.clientY - rect.top };
		}
		const onPointerLeave = () => (pointerPx = null);

		resize();
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(el);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			sync();
		});
		intersectionObserver.observe(el);
		document.addEventListener('visibilitychange', sync);
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		document.documentElement.addEventListener('mouseleave', onPointerLeave);
		sync();

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener('visibilitychange', sync);
			window.removeEventListener('pointermove', onPointerMove);
			document.documentElement.removeEventListener('mouseleave', onPointerLeave);
		};
	});
</script>

{#if !reduceMotion.current}
	<canvas bind:this={canvas} class="absolute inset-0 size-full text-bird print:hidden" aria-hidden="true"
	></canvas>
{/if}
