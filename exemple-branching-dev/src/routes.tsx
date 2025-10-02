import React from "react"; // Viktigt för JSX
import Home from './pages/Home';
import Start from './pages/Start';
import NotFoundPage from './pages/NotFoundPage';
import PostDetails from './pages/PostDetails';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/start', element: <Start /> },
  { path: '/posts/:id', element: <PostDetails /> },
  { path: '*', element: <NotFoundPage /> }
];

export default routes;


