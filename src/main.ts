import initKeyBinds, { getKeyBinds } from "./KeyBinds";
import { runClock } from "./Date";
import initModal from "./Modal";
import "./styles/style.css";
import { getTheme, setTheme, Theme } from "./Theme";
import { getImage, ImageState, setImage } from "./Image";
import { getLinks, initLinkSectionKeybinds, setLinks } from "./Links";
import { initSearchBar, getSearch, setSearch } from "./Search";
import THEMES from "./data/THEMES";

export type ThemeConfig = {
  theme: Theme;
  image: ImageState;
};

async function init() {
  const lastThemeName = localStorage.getItem("lastThemeName") || "custom";

  if (lastThemeName === "Wallbash") {
    try {
      const url = `${import.meta.env.BASE_URL}wallbash.js?t=${Date.now()}`;
      const module = await import(url);
      const data: ThemeConfig = module.default;
      setTheme(data.theme);
      setImage(data.image);
    } catch {
      const saved = THEMES["Wallbash"];
      setTheme(saved.theme);
      setImage(saved.image);
    }
  } else if (lastThemeName !== "custom" && lastThemeName in THEMES) {
    const saved = THEMES[lastThemeName as keyof typeof THEMES];
    setTheme(saved.theme);
    setImage(saved.image);
  } else {
    const imageState = getImage();
    setImage(imageState);
    const theme = getTheme();
    setTheme(theme);
  }

  const links = getLinks();
  initLinkSectionKeybinds();
  setLinks(links);
  runClock();
  const keybinds = getKeyBinds();
  initKeyBinds(keybinds);
  const search = getSearch();
  setSearch(search);
  initSearchBar();
  initModal({
    links,
    keybinds,
    theme: getTheme(),
    imageState: getImage(),
    search,
  });
}

init();

let currentWallbash: ThemeConfig | null = null;

async function loadDynamicWallbash() {
  const lastThemeName = localStorage.getItem("lastThemeName");
  if (lastThemeName !== "Wallbash") return;

  try {
    const url = `${import.meta.env.BASE_URL}wallbash.js?t=${Date.now()}`;
    const module = await import(url);
    const data: ThemeConfig = module.default;

    if (JSON.stringify(data) !== JSON.stringify(currentWallbash)) {
      setTheme(data.theme);
      setImage(data.image);
      currentWallbash = data;
    }
  } catch (e) {
    console.warn("wallbash.js fetch failed", e);
  }
}

loadDynamicWallbash();
setInterval(loadDynamicWallbash, 1000);