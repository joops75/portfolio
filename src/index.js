import React from 'react';
import { render } from 'react-dom';
import Router from './router';
import './styles/main.scss';

// register a service worker via webpack for offline persistance of app in production mode
// requires workbox-webpack-plugin and project to be served by a server (can use http-server for testing)
// see https://webpack.js.org/guides/progressive-web-application/ for more
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

render(<Router />, document.getElementById('target'));
