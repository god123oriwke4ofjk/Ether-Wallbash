const themeModules = import.meta.glob('./themes/*.ts', { eager: true });

const themes = Object.entries(themeModules).reduce((acc, [path, module]) => {
  const themeName = path.replace('./themes/', '').replace('.ts', '');
  acc[themeName] = (module as any).default;
  return acc;
}, {} as Record<string, any>);

export default themes;