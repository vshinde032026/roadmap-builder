import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { RootLayout } from '@/app/RootLayout';
import { ErrorPage } from '@/pages/ErrorPage';

const HomePage = lazy(() => import('@/pages/HomePage'));
const RoadmapsPage = lazy(() => import('@/pages/RoadmapsPage'));
const RoadmapDetailPage = lazy(() => import('@/pages/RoadmapDetailPage'));
const RoadmapNewPage = lazy(() => import('@/pages/RoadmapNewPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={<div>Loading…</div>}>{node}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'roadmap/new', element: withSuspense(<RoadmapNewPage />) },
      { path: 'roadmaps', element: withSuspense(<RoadmapsPage />) },
      { path: 'roadmaps/:id', element: withSuspense(<RoadmapDetailPage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
