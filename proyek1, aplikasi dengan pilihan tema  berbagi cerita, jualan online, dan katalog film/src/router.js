
// src/router.js
const Router = {
    init() {
        window.addEventListener('hashchange', this.handleRouteChange);
        this.handleRouteChange();
    },
    handleRouteChange() {
        const hash = window.location.hash.slice(1) || 'home';
        const app = document.getElementById('app');
        app.classList.add('fade-out');
        setTimeout(() => {
            if (hash.startsWith('detail/')) {
                import('./pages/detail.js').then(module => {
                    app.innerHTML = module.default(hash.split('/')[1]);
                });
            } else {
                import(`./pages/${hash}.js`).then(module => {
                    app.innerHTML = module.default();
                });
            }
            app.classList.remove('fade-out');
        }, 300);
    }
};

export default Router;
