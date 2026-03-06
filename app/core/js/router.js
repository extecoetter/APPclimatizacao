const routes = {
  home: '../core/pages/home.html',
  orcamento: '../core/pages/orcamento.html',
  'cadastro-clientes': '../core/pages/cadastro-clientes.html',
  problemas: '../core/pages/problemas.html',
};

export async function initRouter() {
  const root = document.getElementById('app');
  const route = new URLSearchParams(location.search).get('page') || 'home';
  const url = routes[route] || routes.home;
  const html = await fetch(url).then(r => r.text());
  root.innerHTML = html;

  root.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      const params = new URLSearchParams(location.search);
      params.set('page', btn.dataset.go);
      location.search = params.toString();
    });
  });
}
