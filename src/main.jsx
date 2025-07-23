import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // <-- Add this
import store from './redux/store';     // <-- Adjust path as needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>             {/* <-- Wrap here */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
