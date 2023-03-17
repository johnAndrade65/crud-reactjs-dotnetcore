import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx';
import Menu from './components/Menu.tsx';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

//Local onde é renderizado o componente "App"
ReactDOM.render(
  <Router>
      <Menu />
      <div className='container'>
          <App />
      </div>
  </Router>,
  document.getElementById('root')
);
