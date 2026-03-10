export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Resume-Richard-Pastenes.pdf","icon.png","meta.png","three.min.js"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.DznM-9fj.js",app:"_app/immutable/entry/app.CJcRQxY2.js",imports:["_app/immutable/entry/start.DznM-9fj.js","_app/immutable/chunks/CvpfBVpT.js","_app/immutable/chunks/BeZa1Ckx.js","_app/immutable/entry/app.CJcRQxY2.js","_app/immutable/chunks/B1wF3hOP.js","_app/immutable/chunks/CvpfBVpT.js","_app/immutable/chunks/69iiL1MO.js","_app/immutable/chunks/Dxi2v3A5.js","_app/immutable/chunks/HgGVq546.js","_app/immutable/chunks/BeZa1Ckx.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/resume",
				pattern: /^\/resume\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
