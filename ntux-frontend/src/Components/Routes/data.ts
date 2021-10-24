export const routes = {
  LP_HOMEPAGE: '/',
  LP_ABOUT_US: '/about-us',
  LP_COURSE: '/courses/:courseId',
  REGISTER_COURSE: '/courses/:courseId/register',
  FORUM: {
    BASE: '/forum',
    QUESTIONS: '/forum/questions',
    TAGS: '/forum/tags',
    USERS: '/forum/users',
    QUESTION_DETAIL: '/forum/questions/:questionId',
    QUESTION_TAG: '/forum/tags/:tagId',
  },
  PORTFOLIO: {
    BASE: '/portfolio/:userId',
  },
  COMING_SOON: '/coming-soon',

  // start of admin page
  ADMIN: {
    BASE: '/dashboard',
    MY_COURSES: '/dashboard/my-courses',
    MANAGE_FORUM: '/dashboard/manage-forum',
    EDIT_QUERY: '/dashboard/manage-question/:questionId',
    PORTFOLIO: '/dashboard/portfolio',
  },
  COURSES: {
    BASE: '/dashboard/my-courses',
    COURSE: '/dashboard/my-courses/:courseId',
    OVERVIEW: '/dashboard/my-courses/:courseId/overview',
    COURSE_CONTENT: '/dashboard/my-courses/:courseId/content',
    ANNOUNCEMENTS: '/dashboard/my-courses/:courseId/announcements',
  },
  SETTINGS: {
    PROFILE: {
      BASE: '/dashboard/setting/profile',
      CHANGE_PASSWORD: '/dashboard/setting/profile/change-password',
      LOGOUT: '/dashboard/setting/profile/logout',
    },
    PORTFOLIO: {
      BASE: '/dashboard/setting/portfolio',
    },
  },
};
