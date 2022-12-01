import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { LandingPage } from './features/landing/LandingPage';
import { ChallengeOne } from './features/day01/Challenge';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/1",
    element: <ChallengeOne />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
