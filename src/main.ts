import initKeyBinds, { getKeyBinds } from "./KeyBinds";
import { runClock } from "./Date";
import initModal from "./Modal";
import "./styles/style.css";
import { getTheme, setTheme, Theme } from "./Theme";
import { getImage, ImageState, setImage } from "./Image";
import { getLinks, initLinkSectionKeybinds, setLinks } from "./Links";
import { initSearchBar, getSearch, setSearch } from "./Search";

export type ThemeConfig = {
  theme: Theme;
  image: ImageState;
};

function init() {
  const imageState = getImage();
  setImage(imageState);
  const theme = getTheme();
  setTheme(theme);
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
    theme,
    imageState,
    search,
  });
}

init();

let currentWallbash: ThemeConfig | null = null;

async function loadDynamicWallbash() {
  // First, check if 'wallbash' is the active theme to avoid unnecessary fetches
  const storedTheme = localStorage.getItem('theme');
  if (!storedTheme || !storedTheme.includes('#1a1b26')) { // Replace '#1a1b26' with your wallbash unique color
    return; // Skip if not wallbash
  }

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}wallbash.json`);
    if (!res.ok) return; // Silently skip if file missing or error
    const data: ThemeConfig = await res.json();
    if (JSON.stringify(data) !== JSON.stringify(currentWallbash)) {
      setTheme(data.theme);
      setImage(data.image);
      currentWallbash = data;
      location.reload(); // Reload only on actual change
    }
  } catch (error) {
    console.warn('Wallbash fetch failed:', error); // Log but don't crash
  }
}

loadDynamicWallbash();
setInterval(loadDynamicWallbash, 5000); // Poll every 5s, but conditionally insidedd