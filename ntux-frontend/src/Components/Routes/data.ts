export const routes = {
  LP_HOMEPAGE: '/',
  LP_ABOUT_US: '/about-us',
  LP_COURSE: '/courses/:courseId',
  LOGIN_PAGE: '/login',
  RESET_PASSWORD_PAGE: '/reset-password',
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
    STUDENT_TUTORING: '/dashboard/student-tutoring',
    MANAGE_FORUM: '/dashboard/manage-forum',
    POINTS_REWARDS: '/dashboard/points-rewards',
    EDIT_QUERY: '/dashboard/manage-question/:questionId',
    PORTFOLIO: '/dashboard/portfolio',
  },
  COURSES: {
    BASE: '/dashboard/courses/:courseId',
    COURSE: '/dashboard/courses/:courseId',
    OVERVIEW: '/dashboard/courses/:courseId/overview',
    COURSE_CONTENT: '/dashboard/courses/:courseId/content',
    ANNOUNCEMENTS: '/dashboard/courses/:courseId/announcements',
  },
  SETTINGS: {
    BASE: '/dashboard/settings',
    PROFILE: {
      BASE: '/dashboard/settings/profile',
      CHANGE_PASSWORD: '/dashboard/settings/profile/change-password',
      LOGOUT: '/dashboard/settings/profile/logout',
    },
    PORTFOLIO: {
      BASE: '/dashboard/settings/portfolio',
    },
  },
};
