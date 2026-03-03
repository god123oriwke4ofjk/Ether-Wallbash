import type { Theme } from '../Theme';
import type { ImageState } from '../Image';

export type ThemeConfig = {
  theme: Theme;
  image: ImageState;
};

const modules = import.meta.glob('./themes/*.ts', { eager: true }) as Record<string, { default: ThemeConfig }>;

const themes: Record<string, ThemeConfig> = {};

for (const path in modules) {
  const name = path.replace('./themes/', '').replace('.ts', '');
  themes[name] = modules[path].default;
}

export default themes;