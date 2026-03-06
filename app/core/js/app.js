import { loadInstallerConfig, applyInstallerTheme } from './installer-loader.js';
import { initRouter } from './router.js';

async function boot() {
  const config = await loadInstallerConfig();
  applyInstallerTheme(config);
  initRouter();
}

boot().catch(err => {
  console.error('Falha ao iniciar o app:', err);
  document.body.innerHTML = '<pre style="padding:16px;color:#b00020">Falha ao iniciar o app.</pre>';
});
