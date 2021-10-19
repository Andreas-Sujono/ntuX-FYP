export const routes = {
  LP_HOMEPAGE: '/',
  LP_ABOUT_US: '/about-us',
  BLOG: {
    BASE: '/blogs',
    EACH_BLOG: '/blogs/:blogId',
    EDIT_BLOG: '/admin/blogs/:blogId/edit',
  },
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
  EVENT: {
    BASE: '/events',
  },
  ENTERTAINMENT: {
    BASE: '/entertainment',
  },
  JOB: {
    BASE: '/jobs',
  },
  PROJECT: {
    BASE: '/projects',
  },
  FEED: {
    BASE: '/feed',
  },
  COMING_SOON: '/coming-soon',

  // start of admin page
  ADMIN: {
    BASE: '/admin',
    DASHBOARD: '/admin/dashboard',
    SPECIALIZATIONS: '/admin/dashboard/specializations',
    MANAGE_BLOG: '/admin/dashboard/manage-blogs',
    MANAGE_FORUM: '/admin/dashboard/manage-forum',
    EDIT_BLOG: '/admin/manage-blogs/:blogId',
    EDIT_QUERY: '/admin/manage-blogs/:questionId',
    PORTFOLIO: '/admin/dashboard/portfolio',
  },
  SPECIALIZATIONS: {
    BASE: '/admin/specializations',
    COURSES: '/admin/specializations/:specializationId',
    COURSE: '/admin/specializations/:specializationId/:courseId',
  },
  SETTINGS: {
    PROFILE: {
      BASE: '/admin/dashboard/setting/profile',
      CHANGE_PASSWORD: '/admin/dashboard/setting/profile/change-password',
      LOGOUT: '/admin/dashboard/setting/profile/logout',
    },
    PORTFOLIO: {
      BASE: '/admin/dashboard/setting/portfolio',
    },
  },
};
