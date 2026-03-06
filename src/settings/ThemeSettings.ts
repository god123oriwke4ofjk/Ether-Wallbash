import { StringKeyObj } from "../../types/interfaces";
import THEMES from "../data/THEMES";
import DomRender from "../DomRender";
import { getImage, ImageState, refreshImage, saveImageState } from "../Image";
import {
  getTheme,
  refreshTheme,
  saveTheme,
  Theme,
  THEME_LS_KEY,
} from "../Theme";
import InputGroup from "./InputGroup";
import SettingsSection, {
  SettingsSectionWithChildren,
} from "./SettingsSection";

export default function (
  theme: Theme,
  imageSection: SettingsSection<ImageState>,
) {
  const themeSection = new SettingsSectionWithChildren({
    title: THEME_LS_KEY,
    state: theme,
    sectionEl: document.getElementById("theme-settings") as HTMLElement,
    children: [
      {
        render: function () {
          const selectEl = document.querySelector(
            "#theme-settings select",
          ) as HTMLSelectElement;

          for (const key of Object.keys(THEMES)) {
            const optionEl = DomRender.option({ text: key, value: key });
            selectEl.append(optionEl);
          }

          const lastThemeName = localStorage.getItem("lastThemeName") || "custom";
          selectEl.value = lastThemeName;

          selectEl.addEventListener("change", () => {
            const name = selectEl.value;
            localStorage.setItem("lastThemeName", name); 

            const selectedTheme =
              name === "custom"
                ? { theme: getTheme(), image: getImage() }
                : THEMES[name as keyof typeof THEMES];

            refreshTheme(selectedTheme.theme);
            refreshImage(selectedTheme.image);
            themeSection.state = selectedTheme.theme;
            imageSection.state = selectedTheme.image;
            themeSection.rerender();
            imageSection.rerender();
          });
        },
        rerender: function () {
          const selectEl = document.querySelector(
            "#theme-settings select",
          ) as HTMLSelectElement;
          const lastThemeName = localStorage.getItem("lastThemeName") || "custom";
          selectEl.value = lastThemeName;
        },
      },
      new InputGroup({
        wrapperEl: document.querySelector(
          "#theme-settings .input-group",
        ) as HTMLElement,
        updateState: (e: Event) => {
          const selectEl = document.querySelector(
            "#theme-settings select",
          ) as HTMLSelectElement;
          selectEl.value = "custom";
          localStorage.setItem("lastThemeName", "custom");

          const target = e.target as HTMLInputElement;
          const key = target.name as keyof Theme;
          if (key === "panel opacity")
            themeSection.state[key] = Number(target.value);
          else themeSection.state[key] = target.value;
        },
        getState: (): StringKeyObj => themeSection.state,
        id: THEME_LS_KEY,
      }),
    ],
    onSave: () => {
      saveTheme(themeSection.state);
      saveImageState(imageSection.state);
      refreshTheme(themeSection.state);
    },
  });
  return themeSection;
}