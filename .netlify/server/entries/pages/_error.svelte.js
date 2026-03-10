import { _ as head } from "../../chunks/index.js";
import { F as Footer } from "../../chunks/Footer.js";
function _error($$renderer) {
  head("1j96wlh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Not Found | Richard's Dev Landing</title>`);
    });
  });
  $$renderer.push(`<main><section class="relative"><div class="container h-full max-w-4xl"><h2 class="text-right text-3xl text-light">Nope</h2> <p class="text-right text-light">You made this up, this page doesn't exist</p> <div class="flex h-full items-center"><div class="py-20 text-center font-mono text-6xl text-green hover:underline active:underline"><a href="/">> go back home <span class="blink">▌</span></a></div></div></div></section></main> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _error as default
};
