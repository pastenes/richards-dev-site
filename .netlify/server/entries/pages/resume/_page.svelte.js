import { _ as head, $ as escape_html, a4 as ensure_array_like, Z as derived } from "../../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let resume = derived(() => data.resume);
    head("1mijfb4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Resume | Richard Pastenes</title>`);
      });
    });
    $$renderer2.push(`<nav class="pdf-button fixed -mt-20 top-20 z-20 ml-14 inline-flex flex-col bg-dark p-3 text-center font-fira-code text-green lg:ml-nav"><a class="py-2" href="/Resume-Richard-Pastenes.pdf">PDF</a></nav> <div class="flex h-full w-full flex-col bg-white font-opensans text-sm font-light"><header class="flex flex-col items-center bg-gray pt-12 pb-8"><h1 class="rh1 mb-0">${escape_html(resume().name)}</h1> <h2 class="rh2">${escape_html(resume().jobTitle)}</h2> <ul class="flex gap-4 text-xs"><li><span class="font-mono font-semibold">p.</span>${escape_html(resume().phone)}</li> <li><span class="font-mono font-semibold">e.</span>${escape_html(resume().email)}</li> <li><span class="font-mono font-semibold">w.</span>${escape_html(resume().portfolioUrl?.replace(/^https?:\/\//, ""))}</li></ul></header> <main class="container py-8"><div class="mx-6 print:mx-0 print:grid print:grid-cols-3 print:gap-8 md:mx-0 md:grid md:grid-cols-3 md:gap-8"><div class="summary"><h3 class="rh3">Summary</h3> <p class="mb-0">${escape_html(resume().summary)}</p> <h3 class="rh3">Interests</h3> <ul><!--[-->`);
    const each_array = ensure_array_like(resume().interests ?? []);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let interest = each_array[$$index];
      $$renderer2.push(`<li>${escape_html(interest)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul> <h3 class="rh3">Education</h3> <ul><!--[-->`);
    const each_array_1 = ensure_array_like(resume().education ?? []);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<li><h4 class="rh4">${escape_html(item.degree)}</h4> <p class="mb-0">${escape_html(item.year)}</p> <p>${escape_html(item.school)}</p></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="experience col-span-2"><h3 class="rh3">Experience</h3> <ul class="rexperience"><!--[-->`);
    const each_array_2 = ensure_array_like(resume().experience ?? []);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let item = each_array_2[$$index_3];
      $$renderer2.push(`<li><div class="flex justify-between"><h4 class="rh4">${escape_html(item.role)}</h4> <span class="rdate">${escape_html(item.start)} - ${escape_html(item.end)}</span></div> <h5 class="rh5">${escape_html(item.employer)}</h5> <ul><!--[-->`);
      const each_array_3 = ensure_array_like(item.achievment ?? []);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let piece = each_array_3[$$index_2];
        $$renderer2.push(`<li>${escape_html(piece.achievment)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="mx-6 md:mx-0"><h3 class="rh3">Skills</h3> <ul class="grid grid-cols-2 print:grid-cols-4 md:grid-cols-4"><!--[-->`);
    const each_array_4 = ensure_array_like(resume().skills);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let skill = each_array_4[$$index_4];
      $$renderer2.push(`<li>${escape_html(skill)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></main> <footer class="bg-gray py-8"></footer></div>`);
  });
}
export {
  _page as default
};
