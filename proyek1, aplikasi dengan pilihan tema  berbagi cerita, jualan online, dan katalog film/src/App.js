
// src/App.js
import Router from './router.js';
import ViewTransition from './utils/ViewTransition.js';

document.addEventListener('DOMContentLoaded', () => {
    ViewTransition.init();
    Router.init();
});
