import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="113144037334-r8p8vkmgeaovcn1fs1mkltnp8l4nam8h.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  </React.StrictMode>
)

