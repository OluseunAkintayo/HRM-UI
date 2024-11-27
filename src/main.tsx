import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css';
import './style/index.css';
import { Toaster } from "@/components/ui/toaster"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Dashboard/Home';
import Profile from './Pages/Dashboard/Profile';


// const backendUrl = "https://eventapi-sandbox.azurewebsites.net/api/"
// axios.defaults.baseURL = backendUrl;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/profile",
    element: <Profile />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
);
