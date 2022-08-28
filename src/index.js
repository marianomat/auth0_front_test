import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-4gyuwauo.us.auth0.com"
        clientId="D4u81F60gFrulRSXtS0Ce21TgIt3fJRj"
        redirectUri={window.location.origin}
        audience="banco-austral.web.app/auth0"
        scope="openid%20email%20profile"
    >
        <App />
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
