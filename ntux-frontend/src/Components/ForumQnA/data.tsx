import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from '../Routes';

export const routeData = [
  {
    path: routes.FORUM.BASE,
    component: function X() {
      return <Redirect to={routes.FORUM.QUESTIONS} />;
    },
    exact: true,
  },
  {
    path: routes.FORUM.QUESTIONS,
    component: lazy(() => import('./QuestionsSection')),
    exact: true,
  },
  {
    path: routes.FORUM.QUESTION_DETAIL,
    component: lazy(() => import('./QuestionDetail')),
    exact: true,
  },
  {
    path: routes.FORUM.TAGS,
    component: lazy(() => import('./TagsSection')),
    exact: true,
  },
  {
    path: routes.FORUM.QUESTION_TAG,
    component: lazy(() => import('./QuestionWithTagSection')),
    exact: true,
  },
  {
    path: routes.FORUM.USERS,
    component: lazy(() => import('./UsersSection')),
    exact: true,
  },
];
