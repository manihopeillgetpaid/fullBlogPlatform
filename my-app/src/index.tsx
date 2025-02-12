import ReactDOM from 'react-dom/client';
import React from "react";
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
const rootElement = document.getElementById('root')
if(!rootElement){
  throw new Error('root elem is not found')
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App/>
  </Provider>
  </BrowserRouter>
  </React.StrictMode>
)