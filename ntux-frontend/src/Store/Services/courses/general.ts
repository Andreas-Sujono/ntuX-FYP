import { Id, User } from '../../../Models/Auth';
import BaseService from '../base';

export default class CoursesService extends BaseService {
  getPublicCourses = async () => {
    const res = await this.getRequest('/courses/public');
    return res.data;
  };

  getOnePublicCourses = async (id: Id) => {
    const res = await this.getRequest(`/courses/public/${id}`);
    return res.data;
  };

  getAllCourses = async () => {
    const res = await this.getRequest('/courses');
    return res.data;
  };
  getOneCourse = async (id: Id) => {
    const res = await this.getRequest(`/courses/${id}`);
    return res.data;
  };
  getMyCourses = async () => {
    const res = await this.getRequest(`/courses/me`);
    return res.data;
  };
  getCourseContent = async (courseId: string) => {
    const res = await this.getRequest(
      `/course-content?filter=course.id||eq||${courseId}`,
    );
    return res.data;
  };
  getCourseAnnonucement = async (courseId: string) => {
    const res = await this.getRequest(
      `/course-announcement?filter=course.id||eq||${courseId}`,
    );
    return res.data;
  };
  getOneCourseRegistered = async (id: Id) => {
    const res = await this.getRequest(`/courses/${id}`);
    return res.data;
  };

  registerCourse = async (data: any) => {
    const res = await this.postRequest(`/student-registration`, data);
    return res.data;
  };

  createCourse = async (data: any) => {
    const res = await this.postRequest(`/courses/`, data);
    return res.data;
  };
  updateCourse = async (data: any) => {
    const res = await this.patchRequest(`/courses/${data.id}`, data);
    return res.data;
  };
  deleteCourse = async (id: Id) => {
    const res = await this.deleteRequest(`/courses/${id}`, {});
    return res.data;
  };
}
