// Initialize brand icons from @thesvg/icons
import facebook from "@thesvg/icons/facebook";
import instagram from "@thesvg/icons/instagram";
import youtube from "@thesvg/icons/youtube";
import linkedin from "@thesvg/icons/linkedin";
import tiktok from "@thesvg/icons/tiktok";
import x from "@thesvg/icons/x";
import threads from "@thesvg/icons/threads";
import mastodon from "@thesvg/icons/mastodon";
import bluesky from "@thesvg/icons/bluesky";


const brandIcons = {
  facebook,
  bluesky,
  instagram,
  tiktok,
  x,
  youtube,
  threads,
  mastodon,
  linkedin,
};

const getSvgMarkup = (iconModule) => {
  if (!iconModule) {
    return "";
  }

  if (typeof iconModule === "string") {
    return iconModule;
  }

  if (typeof iconModule.svg === "string") {
    return iconModule.svg;
  }

  if (typeof iconModule.default?.svg === "string") {
    return iconModule.default.svg;
  }

  return "";
};

/**
 * Replace elements with brand SVG icons
 */
export function initBrandIcons({
  nameAttr = "data-brand-icon",
  attrs = {},
  root = document,
} = {}) {
  console.log("Brand icons facebook and instagram initialized:", facebook, instagram);

  if (!brandIcons || Object.keys(brandIcons).length === 0) {
    throw new Error("Brand icons object is required");
  }

  const elements = root.querySelectorAll(`[${nameAttr}]`);

  elements.forEach((el) => {
    const name = el.getAttribute(nameAttr);

    if (!brandIcons[name]) return;

    const svgMarkup = getSvgMarkup(brandIcons[name]);
    if (!svgMarkup) return;

    const svg = new DOMParser().parseFromString(svgMarkup, "image/svg+xml").documentElement;

    // Apply attributes
    if (el.className) svg.setAttribute("class", el.className);
    if (el.getAttribute("aria-label")) svg.setAttribute("aria-label", el.getAttribute("aria-label"));
    if (el.id) svg.setAttribute("id", el.id);
    for (const [key, value] of Object.entries(attrs)) {
      if (typeof value === "string") {
        svg.setAttribute(key, value);
      }
    }

    el.replaceWith(svg);
  });
}

// Auto-initialize brand icons
initBrandIcons();

// {{> "components/icon" name="facebook" brand="true" ariaLabel="facebook icon"}}