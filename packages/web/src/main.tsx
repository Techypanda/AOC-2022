import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "nes.css/css/nes.min.css";
import { LandingPage } from './features/landing/LandingPage';
import { ChallengeOne } from './features/day01/Challenge';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Page } from './components/Page';
import { ChallengeTwo } from './features/day02/Challenge';
import { ChallengeThree } from './features/day03/Challenge';
import { ChallengeFour } from './features/day04/Challenge';

const queryClient = new QueryClient
const router = createBrowserRouter([
  {
    path: "*",
    element: <Page children={<LandingPage />} />,
  },
  {
    path: "/1",
    element: <Page children={<ChallengeOne />} />
  },
  {
    path: "/2",
    element: <Page children={<ChallengeTwo />} />
  },
  {
    path: "/3",
    element: <Page children={<ChallengeThree />} />
  },
  {
    path: "/4",
    element: <Page children={<ChallengeFour />} />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
