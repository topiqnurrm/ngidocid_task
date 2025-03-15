// router.js
import Home from './pages/home.js';
import AddStory from './pages/addStory.js';
import Detail from './pages/detail.js';

const routes = {
  '/': Home,
  '/add': AddStory,
  '/detail': Detail
};

const Router = {
  async render() {
    const hash = window.location.hash.split('?')[0] || '/';
    const page = routes[hash] || Home;
    document.getElementById('app').innerHTML = await page.render();
    await page.afterRender();
  }
};

export default Router;