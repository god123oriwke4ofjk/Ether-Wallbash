const themeModules = import.meta.glob('./themes/*.ts', { eager: true });

console.log('[THEMES.ts] Raw theme modules:', themeModules);

const themes = Object.entries(themeModules).reduce((acc, [path, module]) => {
  try {
    const themeName = path.replace('./themes/', '').replace('.ts', '');
    const themeData = (module as any).default;
    if (!themeData || !themeData.theme || !themeData.image) {
      console.warn(`[THEMES.ts] Invalid theme data for ${themeName}:`, themeData);
      return acc;
    }
    acc[themeName] = themeData;
    console.log(`[THEMES.ts] Loaded theme: ${themeName}`, themeData);
    return acc;
  } catch (error) {
    console.error(`[THEMES.ts] Error processing theme at ${path}:`, error);
    return acc;
  }
}, {} as Record<string, any>);

console.log('[THEMES.ts] Final themes object:', themes);

export default themes;
