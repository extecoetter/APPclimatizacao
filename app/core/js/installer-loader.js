export async function loadInstallerConfig() {
  const params = new URLSearchParams(location.search);
  const cliente = params.get('c') || 'cliente1';
  const scriptUrl = `../../clientes/${cliente}/config.js`;

  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Não foi possível carregar ${scriptUrl}`));
    document.head.appendChild(script);
  });

  if (!window.CLIENT_CONFIG) {
    throw new Error('CLIENT_CONFIG não encontrado.');
  }
  return window.CLIENT_CONFIG;
}

export function applyInstallerTheme(config) {
  const theme = config?.theme || {};
  const root = document.documentElement;
  if (theme.primary) root.style.setProperty('--brand', theme.primary);
  if (theme.primaryStrong) root.style.setProperty('--brand-strong', theme.primaryStrong);
  if (theme.bg) root.style.setProperty('--bg', theme.bg);
  if (theme.card) root.style.setProperty('--card', theme.card);
  if (theme.text) root.style.setProperty('--text', theme.text);
}
