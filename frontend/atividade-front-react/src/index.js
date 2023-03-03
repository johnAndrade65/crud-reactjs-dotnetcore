import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

//Local onde é renderizado o componente "App"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='container'>
    <App />
  </div>
);