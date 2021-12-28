import { Id } from '../../../Models/Auth';
import BaseService from '../base';

export default class AdminService extends BaseService {
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
    const res = await this.getRequest('/user/');
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
}
