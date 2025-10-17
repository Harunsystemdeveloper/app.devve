import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../sass/index.scss';
import App from './App';
import routes from './routes';

// Browser router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes // Routes här som barn
  }
]);

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

console.log("Hejsan")