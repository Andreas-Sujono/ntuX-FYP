export const routes = {
  LP_HOMEPAGE: '/',
  LP_ABOUT_US: '/about-us',
  LP_COURSE: '/courses/:courseId',
  LOGIN_PAGE: '/login',
  ALL_COURSES: '/all-courses',
  RESET_PASSWORD_PAGE: '/reset-password',
  FORGOT_PASSWORD_PAGE: '/forgot-password',
  CONFIRM_FORGOT_PASSWORD_PAGE: '/confirm-forgot-password',
  CONFIRM_EMAIL_PAGE: '/confirm-email',
  REGISTER_COURSE: '/courses/:courseId/register',
  FORUM: {
    BASE: '/forum',
    QUESTIONS: '/forum/questions',
    CREATE_QUESTION: '/forum/create/question',
    UPDATE_QUESTION: '/forum/update/question/:questionId',
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
  STAFF: {
    BASE: '/admin',
    DASHBOARD: '/admin/dashboard',
    MANAGE_COURSES: '/admin/manage-courses',
    MANAGE_USERS: '/admin/manage-users',
    MANAGE_REWARDS: '/admin/manage-rewards',
    MANAGE_FORUM: '/admin/manage-forum',
    SETTINGS: '/admin/settings',
  },
  STAFF_COURSES: {
    BASE: '/admin/courses/:courseId',
    DASHBOARD: '/admin/courses/:courseId/dashboard',
    OVERVIEW: '/admin/courses/:courseId/overview',
    COURSE_CONTENT: '/admin/courses/:courseId/content',
    ANNOUNCEMENTS: '/admin/courses/:courseId/announcements',
    MANAGE_BATCH: '/admin/courses/:courseId/manage-batch',
    MANAGE_STUDENTS: '/admin/courses/:courseId/manage-students',
    STUDENT_DETAIL: '/admin/courses/:courseId/students/:studentId',
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
