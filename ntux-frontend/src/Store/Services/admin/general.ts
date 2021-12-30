import { Id } from '../../../Models/Auth';
import BaseService from '../base';

export default class AdminService extends BaseService {
  uploadFile = async (data: FormData) => {
    const res = await this.postRequest('/common/upload-file', data);
    return res.data;
  };
  getWebsiteActivity = async () => {
    const res = await this.getRequest('/website-activity/summary');
    return res.data;
  };

  getSummary = async (userId?: string) => {
    if (userId) {
      const res = await this.getRequest(`/admin/summary`);
      return res.data;
    }
    const res = await this.getRequest('/admin/summary/');
    return res.data;
  };
  getAllUsers = async () => {
    const res = await this.getRequest('/user/?sort=createdAt,DESC');
    return res.data;
  };
  getAllCourses = async () => {
    const res = await this.getRequest(
      '/courses/?sort=createdAt,DESC&join=courseBatches',
    );
    return res.data;
  };
  getOneCourse = async (courseId: Id) => {
    const res = await this.getRequest(`/courses/${courseId}`);
    return res.data;
  };
  getAllRewards = async () => {
    const res = await this.getRequest('/reward/');
    return res.data;
  };
  getAllQuestions = async () => {
    const res = await this.getRequest('/forum-question/');
    return res.data;
  };
  getAllLecturers = async () => {
    const res = await this.getRequest('/user/all/lecturers');
    return res.data;
  };
  getAllStudentRegistrations = async (courseId: string) => {
    const res = await this.getRequest(
      `/student-registration?sort=createdAt,DESC&join=course&join=user&filter=course.id||eq||${courseId}`,
    );
    return res.data;
  };

  createCourse = async (data: any) => {
    const res = await this.postRequest(`/courses/`, data);
    return res.data;
  };
  updateCourse = async (data: any) => {
    const res = await this.patchRequest(`/courses/${data.course}`, data);
    return res.data;
  };
  deleteCourse = async (id: Id) => {
    const res = await this.deleteRequest(`/courses/${id}`, {});
    return res.data;
  };

  createCourseContent = async (data: any) => {
    const res = await this.postRequest(`/course-content/`, data);
    return res.data;
  };
  updateCourseContent = async (data: any) => {
    const res = await this.patchRequest(`/course-content/${data.id}`, data);
    return res.data;
  };
  deleteCourseContent = async (id: Id) => {
    const res = await this.deleteRequest(`/course-content/${id}`, {});
    return res.data;
  };

  createReward = async (data: any) => {
    const res = await this.postRequest(`/reward/`, data);
    return res.data;
  };
  updateReward = async (data: any) => {
    const res = await this.patchRequest(`/reward/${data.id}`, data);
    return res.data;
  };
  deleteReward = async (id: Id) => {
    const res = await this.deleteRequest(`/reward/${id}`, {});
    return res.data;
  };

  createUser = async (data: any) => {
    const res = await this.postRequest(`/user/`, data);
    return res.data;
  };
  updateUser = async (data: any) => {
    const res = await this.patchRequest(`/user/${data.id}`, data);
    return res.data;
  };
  changeStatusRegistration = async (data: any) => {
    const res = await this.patchRequest(
      `/student-registration/${data.id}/status`,
      data,
    );
    return res.data;
  };
  deleteUser = async (id: Id) => {
    const res = await this.deleteRequest(`/user/${id}`, {});
    return res.data;
  };

  createBatch = async (data: any) => {
    const res = await this.postRequest(`/course-batch/`, data);
    return res.data;
  };
  updateBatch = async (data: any) => {
    const res = await this.patchRequest(`/course-batch/${data.id}`, data);
    return res.data;
  };
  deleteBatch = async (id: Id) => {
    const res = await this.deleteRequest(`/course-batch/${id}`, {});
    return res.data;
  };

  createCourseAnnouncement = async (data: any) => {
    const res = await this.postRequest(`/course-announcement/`, data);
    return res.data;
  };
  updateCourseAnnouncement = async (data: any) => {
    const res = await this.patchRequest(
      `/course-announcement/${data.id}`,
      data,
    );
    return res.data;
  };
  deleteCourseAnnouncement = async (id: Id) => {
    const res = await this.deleteRequest(`/course-announcement/${id}`, {});
    return res.data;
  };

  getStudentSummary = async (userId: Id) => {
    const res = await this.getRequest(`/admin/user/summary?userId=${userId}`);
    return res.data;
  };
}
