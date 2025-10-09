import React from "react"; // Viktigt för JSX
import Home from './pages/Home';
import Start from './pages/Start';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/start', element: <Start /> },
  { path: '/create', element: <CreatePost /> },
  { path: '/edit/:id', element: <EditPost /> },
  { path: '/posts/:id', element: <PostDetails /> },
  { path: '*', element: <NotFoundPage /> }
];

export default routes;


