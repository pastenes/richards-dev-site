import * as server from '../entries/pages/resume/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/resume/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/resume/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.oNAtsdKa.js","_app/immutable/chunks/HgGVq546.js","_app/immutable/chunks/CvpfBVpT.js","_app/immutable/chunks/Dxi2v3A5.js","_app/immutable/chunks/D2pxFtD4.js","_app/immutable/chunks/B_4DIviF.js"];
export const stylesheets = [];
export const fonts = [];
