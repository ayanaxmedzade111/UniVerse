import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { UniversitiesPage } from '../pages/UniversitiesPage';
import { UniversityDashboardPage } from '../pages/UniversityDashboardPage';
import { ConfessionsPage } from '../pages/ConfessionsPage';
import { CreateConfessionPage } from '../pages/CreateConfessionPage';
import { ResourcesPage } from '../pages/ResourcesPage';
import { CreateResourcePage } from '../pages/CreateResourcePage';
import { ChatPage } from '../pages/ChatPage';
import { RecommendationsPage } from '../pages/RecommendationsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { AvatarPage } from '../pages/AvatarPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ModerationPage } from '../pages/ModerationPage';
import { GuidelinesPage } from '../pages/GuidelinesPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/universities',
    element: <UniversitiesPage />,
  },
  {
    path: '/universities/:universitySlug',
    element: <UniversityDashboardPage />,
  },
  {
    path: '/universities/:universitySlug/confessions',
    element: <ConfessionsPage />,
  },
  {
    path: '/universities/:universitySlug/confessions/new',
    element: <CreateConfessionPage />,
  },
  {
    path: '/universities/:universitySlug/resources',
    element: <ResourcesPage />,
  },
  {
    path: '/universities/:universitySlug/resources/new',
    element: <CreateResourcePage />,
  },
  {
    path: '/universities/:universitySlug/chat',
    element: <ChatPage />,
  },
  {
    path: '/universities/:universitySlug/recommendations',
    element: <RecommendationsPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/profile/avatar',
    element: <AvatarPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/moderation',
    element: <ModerationPage />,
  },
  {
    path: '/guidelines',
    element: <GuidelinesPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
