import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.CTCT2KS3.js","_app/immutable/chunks/HgGVq546.js","_app/immutable/chunks/CvpfBVpT.js","_app/immutable/chunks/B_4DIviF.js","_app/immutable/chunks/B1wF3hOP.js","_app/immutable/chunks/69iiL1MO.js","_app/immutable/chunks/BeZa1Ckx.js","_app/immutable/chunks/Dxi2v3A5.js","_app/immutable/chunks/B7jQ5kGd.js","_app/immutable/chunks/D2pxFtD4.js","_app/immutable/chunks/BvE5nsGu.js"];
export const stylesheets = [];
export const fonts = [];
