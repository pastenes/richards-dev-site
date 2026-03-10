import { $ as escape_html, a0 as attr, a1 as stringify, Z as derived, a2 as element, a3 as fallback, a4 as ensure_array_like, a5 as attr_class, _ as head } from "../../chunks/index.js";
import "clsx";
import { spanToPlainText, isPortableTextToolkitList, isPortableTextListItemBlock, isPortableTextToolkitSpan, isPortableTextBlock, isPortableTextToolkitTextNode, buildMarksTree, nestLists, LIST_NEST_MODE_HTML } from "@portabletext/toolkit";
import { F as Footer } from "../../chunks/Footer.js";
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { hero = {} } = $$props;
    $$renderer2.push(`<section class="flex h-screen w-screen flex-col bg-neutral py-0 lg:flex-row"><div class="w-3/4 flex-auto px-0 pt-14 pb-14 lg:w-1/2 lg:self-center lg:p-14"><div class="max-w-md"><p class="mb-1 ml-1 font-fira-code">Hi, I'm</p> <h1 class="mb-1 text-5xl">${escape_html(hero.title ?? "")}</h1> <p>${escape_html(hero.intro?.[0]?.children?.[0]?.text ?? "")}</p> <div class="my-8 flex justify-start"><a class="pr-2 text-2xl text-black"${attr("href", `https://www.linkedin.com/in/${stringify(hero.links?.linkedin ?? "")}`)} target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg class="hover:drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a> <a class="pr-2 text-2xl text-black"${attr("href", `https://github.com/${stringify(hero.links?.github ?? "")}`)} target="_blank" rel="noreferrer" aria-label="GitHub"><svg class="hover:drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a> <a class="pr-2 text-2xl text-black"${attr("href", `https://twitter.com/${stringify(hero.links?.twitter ?? "")}`)} target="_blank" rel="noreferrer" aria-label="Twitter"><svg class="hover:drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a></div></div></div> <div class="absolute bottom-0 w-1/2 max-w-xs self-end lg:relative lg:justify-self-end">`);
    if (hero.headshot?.url) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", hero.headshot.url)}${attr("alt", hero.headshot.alt ?? "")} width="380" loading="eager"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function Jumplinks($$renderer) {
  $$renderer.push(`<nav class="sticky -top-20 z-20 -mt-20 ml-14 inline-flex flex-col bg-dark p-3 text-center font-fira-code text-green lg:ml-nav"><a class="py-4" href="#about" aria-label="Scroll to about section"><div class="bg-dark text-center text-5xl"><svg class="ml-1 inline-block animate-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg></div></a> <a class="py-4" href="#about">About</a> <a class="py-4" href="#work">Work</a> <a class="py-4" href="/resume">Resume</a></nav>`);
}
function getRandomKey() {
  return Math.random().toFixed(5).split(".")[1];
}
function assertSpanKey(span) {
  return {
    _key: span._key || getRandomKey(),
    ...span
  };
}
function assertBlockKey(block) {
  return {
    _key: block._key || getRandomKey(),
    ...block,
    ...block._type === "block" && Array.isArray(block.children) ? {
      children: block.children.map(assertSpanKey)
    } : {}
  };
}
function DefaultMark($$renderer, $$props) {
  let { portableText, children } = $$props;
  let markType = derived(() => portableText.markType);
  if (markType() === "strong") {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<strong>`);
    children?.($$renderer);
    $$renderer.push(`<!----></strong>`);
  } else if (markType() === "em") {
    $$renderer.push("<!--[1-->");
    $$renderer.push(`<em>`);
    children?.($$renderer);
    $$renderer.push(`<!----></em>`);
  } else if (markType() === "code") {
    $$renderer.push("<!--[2-->");
    $$renderer.push(`<code>`);
    children?.($$renderer);
    $$renderer.push(`<!----></code>`);
  } else if (markType() === "underline") {
    $$renderer.push("<!--[3-->");
    $$renderer.push(`<span style="text-decoration:underline;">`);
    children?.($$renderer);
    $$renderer.push(`<!----></span>`);
  } else if (markType() === "strike-through") {
    $$renderer.push("<!--[4-->");
    $$renderer.push(`<del>`);
    children?.($$renderer);
    $$renderer.push(`<!----></del>`);
  } else {
    $$renderer.push("<!--[-1-->");
    children?.($$renderer);
    $$renderer.push(`<!---->`);
  }
  $$renderer.push(`<!--]-->`);
}
function DefaultLink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText, children } = $$props;
    let href = derived(() => {
      const { href: href2, url, link, value } = portableText.value;
      return href2 || url || link || value;
    });
    if (typeof href() === "string") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", href())}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function DefaultBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText, children } = $$props;
    let style = derived(() => portableText.value.style || "normal");
    if (["h1", "h2", "h3", "h4", "h5", "h6", "blockquote"].includes(style())) {
      $$renderer2.push("<!--[0-->");
      element($$renderer2, style(), void 0, () => {
        children?.($$renderer2);
        $$renderer2.push(`<!---->`);
      });
    } else if (style() === "normal") {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<p>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function DefaultList($$renderer, $$props) {
  let { portableText, children } = $$props;
  let value = derived(() => portableText.value);
  let listItem = derived(() => value().listItem);
  if (listItem() === "number") {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<ol>`);
    children?.($$renderer);
    $$renderer.push(`<!----></ol>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<ul>`);
    children?.($$renderer);
    $$renderer.push(`<!----></ul>`);
  }
  $$renderer.push(`<!--]-->`);
}
function DefaultListItem($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<li>`);
  children?.($$renderer);
  $$renderer.push(`<!----></li>`);
}
function DefaultHardBreak($$renderer) {
  $$renderer.push(`<br/>`);
}
function UnknownType($$renderer, $$props) {
  let { children } = $$props;
  children?.($$renderer);
  $$renderer.push(`<!---->`);
}
const defaultComponents = {
  marks: {
    "strike-through": DefaultMark,
    code: DefaultMark,
    em: DefaultMark,
    strong: DefaultMark,
    underline: DefaultMark,
    link: DefaultLink
  },
  block: {
    blockquote: DefaultBlock,
    h1: DefaultBlock,
    h2: DefaultBlock,
    h3: DefaultBlock,
    h4: DefaultBlock,
    h5: DefaultBlock,
    h6: DefaultBlock,
    normal: DefaultBlock
  },
  list: {
    bullet: DefaultList,
    number: DefaultList
  },
  listItem: {
    bullet: DefaultListItem,
    number: DefaultListItem
  },
  types: {},
  hardBreak: DefaultHardBreak,
  unknownBlockStyle: DefaultBlock,
  unknownList: DefaultList,
  unknownListItem: DefaultListItem,
  unknownMark: DefaultMark,
  unknownType: UnknownType
};
function mergeComponents(parent, overrides = {}) {
  return {
    ...parent,
    ...overrides,
    block: mergeDeeply(parent, overrides, "block"),
    list: mergeDeeply(parent, overrides, "list"),
    listItem: mergeDeeply(parent, overrides, "listItem"),
    marks: mergeDeeply(parent, overrides, "marks"),
    types: mergeDeeply(parent, overrides, "types")
  };
}
function mergeDeeply(parent, overrides, key) {
  const override = overrides[key];
  const parentVal = parent[key];
  if (typeof override === "function") {
    return override;
  }
  if (override && typeof parentVal === "function") {
    return override;
  }
  if (override) {
    return { ...parentVal, ...override };
  }
  return parentVal;
}
function RenderBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, node, indexInParent, children } = $$props;
    let components = derived(() => global.components);
    let style = derived(() => fallback(node.style, "normal"));
    let blockComponent = derived(() => typeof components().block === "function" ? components().block : components().block[style()]);
    let blockProps = derived(() => {
      return { global, indexInParent, value: node };
    });
    let BlockComponent = derived(() => blockComponent() || components().unknownBlockStyle);
    if (BlockComponent()) {
      $$renderer2.push("<!--[-->");
      BlockComponent()($$renderer2, {
        portableText: blockProps(),
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderCustomBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, node, parentBlock, indexInParent, isInline = false } = $$props;
    let components = derived(() => global.components);
    let _type = derived(() => node._type);
    let customComponent = derived(() => components().types[_type()]);
    let componentProps = derived(() => /* @__PURE__ */ (() => {
      return { global, value: node, indexInParent, parentBlock, isInline };
    })());
    let CustomComponent = derived(() => customComponent() || components().unknownType);
    if (CustomComponent()) {
      $$renderer2.push("<!--[-->");
      CustomComponent()($$renderer2, { portableText: componentProps() });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, indexInParent, node, children } = $$props;
    let listComponent = derived(() => {
      const { list } = global.components;
      return typeof list === "function" ? list : list[node.listItem];
    });
    let listProps = derived(() => ({ global, value: node, indexInParent }));
    let ListComponent = derived(() => listComponent() || global.components.unknownList);
    if (ListComponent()) {
      $$renderer2.push("<!--[-->");
      ListComponent()($$renderer2, {
        portableText: listProps(),
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderListItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, indexInParent, node, children } = $$props;
    let components = derived(() => global.components);
    let style = derived(() => node.style ?? "normal");
    let listItemComponent = derived(() => typeof components().listItem === "function" ? components().listItem : components().listItem[style()]);
    let StyleComponent = derived(() => style() !== "normal" ? components().block[style()] : void 0);
    let listItemProps = derived(() => ({ global, value: node, indexInParent }));
    let ListItemComponent = derived(() => listItemComponent() || components().unknownListItem);
    if (ListItemComponent()) {
      $$renderer2.push("<!--[-->");
      ListItemComponent()($$renderer2, {
        portableText: listItemProps(),
        children: ($$renderer3) => {
          if (StyleComponent()) {
            $$renderer3.push("<!--[0-->");
            if (StyleComponent()) {
              $$renderer3.push("<!--[-->");
              StyleComponent()($$renderer3, {
                portableText: { ...listItemProps(), value: { ...node, listItem: void 0 } },
                children: ($$renderer4) => {
                  children?.($$renderer4);
                  $$renderer4.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer3.push("<!--]-->");
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push("<!--]-->");
            }
          } else {
            $$renderer3.push("<!--[-1-->");
            children?.($$renderer3);
            $$renderer3.push(`<!---->`);
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderSpan($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, node, parentBlock, children } = $$props;
    let markComponent = derived(() => global.components.marks[node.markType]);
    let markProps = derived(() => ({
      global,
      parentBlock,
      markType: node.markType,
      // @ts-expect-error @TODO
      value: node.markDef,
      markKey: node.markKey,
      plainTextContent: spanToPlainText(node)
    }));
    let MarkComponent = derived(() => markComponent() || global.components.unknownMark);
    if (MarkComponent()) {
      $$renderer2.push("<!--[-->");
      MarkComponent()($$renderer2, {
        portableText: markProps(),
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderText($$renderer, $$props) {
  let { global, node } = $$props;
  let components = derived(() => global.components);
  let text = derived(() => node.text);
  if (text() === "\n") {
    $$renderer.push("<!--[0-->");
    if (typeof components().hardBreak === "function") {
      $$renderer.push("<!--[0-->");
      if (components.hardBreak) {
        $$renderer.push("<!--[-->");
        components.hardBreak($$renderer, {});
        $$renderer.push("<!--]-->");
      } else {
        $$renderer.push("<!--[!-->");
        $$renderer.push("<!--]-->");
      }
    } else {
      $$renderer.push("<!--[-1-->");
      $$renderer.push(`${escape_html(text())}`);
    }
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`${escape_html(text())}`);
  }
  $$renderer.push(`<!--]-->`);
}
function RenderNode_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, options } = $$props;
    let node = derived(() => options.node), indexInParent = derived(() => options.indexInParent), parentBlock = derived(() => options.parentBlock), isInline = derived(() => options.isInline);
    if (isPortableTextToolkitList(node())) {
      $$renderer2.push("<!--[0-->");
      RenderList($$renderer2, {
        node: node(),
        indexInParent: indexInParent(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(node().children);
          for (let childIndex = 0, $$length = each_array.length; childIndex < $$length; childIndex++) {
            let child = each_array[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                node: child,
                indexInParent: childIndex,
                parentBlock: void 0,
                isInline: void 0
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextListItemBlock(node())) {
      $$renderer2.push("<!--[1-->");
      RenderListItem($$renderer2, {
        node: node(),
        indexInParent: indexInParent(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(buildMarksTree(node()));
          for (let childIndex = 0, $$length = each_array_1.length; childIndex < $$length; childIndex++) {
            let child = each_array_1[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                parentBlock: node(),
                node: child,
                isInline: true,
                indexInParent: childIndex
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextToolkitSpan(node())) {
      $$renderer2.push("<!--[2-->");
      RenderSpan($$renderer2, {
        node: node(),
        parentBlock: parentBlock(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(node().children);
          for (let childIndex = 0, $$length = each_array_2.length; childIndex < $$length; childIndex++) {
            let child = each_array_2[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                parentBlock: parentBlock(),
                node: child,
                isInline: true,
                indexInParent: childIndex
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextBlock(node())) {
      $$renderer2.push("<!--[3-->");
      RenderBlock($$renderer2, {
        node: node(),
        indexInParent: indexInParent(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_3 = ensure_array_like(buildMarksTree(node()));
          for (let childIndex = 0, $$length = each_array_3.length; childIndex < $$length; childIndex++) {
            let child = each_array_3[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                parentBlock: node(),
                node: child,
                isInline: true,
                indexInParent: childIndex
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextToolkitTextNode(node())) {
      $$renderer2.push("<!--[4-->");
      RenderText($$renderer2, { node: node(), global });
    } else if (node()) {
      $$renderer2.push("<!--[5-->");
      RenderCustomBlock($$renderer2, {
        node: node(),
        parentBlock: parentBlock(),
        indexInParent: indexInParent(),
        isInline: isInline(),
        global
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
const getTemplate = (type, prop) => `Unknown ${type}, specify a component for it in the \`components${prop ? "." : ""}${prop}\` prop`;
const getWarningMessage = (type, nodeType) => {
  switch (nodeType) {
    case "block":
      return getTemplate(`block type "${type}"`, "types");
    case "blockStyle":
      return getTemplate(`block style "${type}"`, "block");
    case "listItemStyle":
      return getTemplate(`list item style "${type}"`, "listItem");
    case "listStyle":
      return getTemplate(`list style "${type}"`, "list");
    case "mark":
      return getTemplate(`mark type "${type}"`, "marks");
    default:
      return getTemplate("type");
  }
};
function printWarning(message) {
  console.warn(message);
}
function PortableText($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = [],
      components,
      context = {},
      onMissingComponent = true
    } = $$props;
    let mergedComponents = derived(() => mergeComponents(defaultComponents, components));
    let keyedBlocks = derived(() => (Array.isArray(value) ? value : [value]).map(assertBlockKey));
    let blocks = derived(() => nestLists(keyedBlocks(), LIST_NEST_MODE_HTML));
    let missingComponentHandler = derived(() => (type, nodeType) => {
      if (onMissingComponent === false) {
        return;
      }
      const message = getWarningMessage(type, nodeType);
      if (typeof onMissingComponent === "function") {
        onMissingComponent(message, { type, nodeType });
        return;
      }
      printWarning(message);
    });
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(blocks());
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let node = each_array[index];
      RenderNode_1($$renderer2, {
        global: {
          components: mergedComponents(),
          missingComponentHandler: missingComponentHandler(),
          context,
          ptBlocks: blocks(),
          ptRawValue: value
        },
        options: { node, isInline: false, indexInParent: index }
      });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function BlockContent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { blocks = [] } = $$props;
    if (blocks && blocks.length > 0) {
      $$renderer2.push("<!--[0-->");
      PortableText($$renderer2, { value: blocks });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function TechTags($$renderer, $$props) {
  let { tags = [] } = $$props;
  $$renderer.push(`<div class="basis-1/2 lg:basis-1/4"><h3 class="mb-6 text-light">A few technologies I'm familiar with:</h3> <ul class="grid grid-cols-2 font-fira-code text-tiny text-green"><!--[-->`);
  const each_array = ensure_array_like(tags);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tag = each_array[$$index];
    $$renderer.push(`<li>${escape_html(tag)}</li>`);
  }
  $$renderer.push(`<!--]--></ul></div>`);
}
function About($$renderer, $$props) {
  let { content = [], tags = [] } = $$props;
  Jumplinks($$renderer);
  $$renderer.push(`<!----> <section id="about" class="relative"><div class="container h-full max-w-4xl"><h2 class="text-right text-3xl text-light">About Me</h2> <p class="text-right text-light">And the tech I use</p> <div class="flex h-full flex-col items-center justify-between lg:flex-row"><div class="basis-1/2 py-14 text-muted">`);
  BlockContent($$renderer, { blocks: content });
  $$renderer.push(`<!----></div> `);
  TechTags($$renderer, { tags });
  $$renderer.push(`<!----></div></div></section>`);
}
function Work($$renderer, $$props) {
  let { projects = [] } = $$props;
  $$renderer.push(`<section id="work"><div class="container"><h2 class="text-right text-3xl text-light">Work</h2> <p class="text-right text-light">Some things I've built</p> <!--[-->`);
  const each_array = ensure_array_like(projects);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let project = each_array[index];
    const side = index % 2 === 0;
    $$renderer.push(`<div${attr_class(`relative my-24 flex h-600 flex-col items-center first-of-type:mt-8 lg:my-48 lg:h-auto ${stringify(side ? "lg:flex-row" : "lg:flex-row-reverse")}`)}><div class="h-full w-full lg:w-1/2"><a${attr("href", project.projectUrl)} target="_blank" rel="noreferrer">`);
    if (project.screenshot?.url) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<img${attr("src", project.screenshot.url)}${attr("alt", project.screenshot.alt)} width="1000" loading="lazy" class="duration-250 h-full w-full object-cover brightness-75 grayscale transition ease-in-out hover:brightness-100 hover:grayscale-0"/>`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]--></a></div> <div class="absolute z-10 flex h-full w-full flex-col justify-center border-2 border-light border-opacity-50 bg-dark bg-opacity-75 px-6 lg:relative lg:block lg:h-auto lg:w-1/2 lg:border-0 lg:bg-dark/0 lg:p-0"><h3${attr_class(`text-left text-light ${stringify(side ? "lg:text-right" : "lg:text-left")} mb-0 lg:mb-4`)}>${escape_html(project.title)}</h3> <div${attr_class(`bg-transparent lg:bg-dark ${stringify(side ? "mr-0 lg:-ml-20" : "ml-0 lg:-mr-20")} lg:drop-shadow-lg`)}><div${attr_class(`px-0 py-6 text-left text-muted lg:px-8 ${stringify(side ? "lg:text-right" : "lg:text-left")}`)}>`);
    BlockContent($$renderer, { blocks: project.description });
    $$renderer.push(`<!----></div></div> <ul${attr_class(`flex flex-wrap justify-start font-fira-code text-light ${stringify(side ? "lg:justify-end" : "lg:justify-start")}`)}><!--[-->`);
    const each_array_1 = ensure_array_like(project.tags);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let tag = each_array_1[$$index];
      $$renderer.push(`<li${attr_class(`mt-2 pr-4 text-tiny text-green ${stringify(side ? "lg:justify-end lg:pl-4 lg:pr-0" : "lg:justify-start lg:pr-4 lg:pl-0")}`)}>${escape_html(tag.label)}</li>`);
    }
    $$renderer.push(`<!--]--></ul></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Richard's Dev Landing | Richard Pastenes' personal web development website</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Richard Pastenes' personal web development website"/> <link rel="canonical" href="https://richard.pastenes.dev"/> <meta property="og:title" content="Richard's Dev Landing"/> <meta property="og:description" content="Richard Pastenes' personal web development website"/> <meta property="og:type" content="website"/> <meta property="og:image" content="https://richard.pastenes.dev/meta.png"/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="675"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:site" content="@richardpastenes"/> <meta name="twitter:title" content="Richard's Dev Landing"/> <meta name="twitter:description" content="Richard Pastenes' personal web development website"/> <meta name="twitter:image" content="https://richard.pastenes.dev/meta.png"/> <meta name="twitter:image:alt" content="Richard Pastenes' personal web development website"/>`);
    });
    $$renderer2.push(`<main>`);
    Header($$renderer2, { hero: data.hero });
    $$renderer2.push(`<!----> `);
    About($$renderer2, { content: data.about.content, tags: data.about.tags });
    $$renderer2.push(`<!----> `);
    Work($$renderer2, { projects: data.projects });
    $$renderer2.push(`<!----></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
