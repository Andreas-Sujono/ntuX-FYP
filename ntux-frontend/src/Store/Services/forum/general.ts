/* eslint-disable @typescript-eslint/no-unused-vars */
import { Id } from '../../../Models/Auth';
import BaseService from '../base';

export default class PointsRewardsService extends BaseService {
  getAllQuestions = async (tagId?: any) => {
    const res = await this.getRequest(
      `/forum-question/${tagId ? `?tagId=${tagId}` : ''}`,
    );
    return res.data;
  };
  getMyQuestions = async () => {
    const res = await this.getRequest('/forum-question/me');
    return res.data;
  };
  getOneQuestion = async (id: Id) => {
    const res = await this.getRequest(`/forum-question/${id}`);
    return res.data;
  };
  getUnansweredQuestions = async () => {
    const res = await this.getRequest('/forum-question/unanswered');
    return res.data;
  };

  getAllUsers = async () => {
    const res = await this.getRequest(`/user/student`);
    return res.data;
  };
  getTopUsers = async () => {
    const res = await this.getRequest(`/user/top`);
    return res.data;
  };
  getActiveUsers = async () => {
    const res = await this.getRequest(`/user/active`);
    return res.data;
  };

  getAllTags = async () => {
    const res = await this.getRequest(`/forum-tag`);
    return res.data;
  };
  createQuestion = async (data: any) => {
    const res = await this.postRequest(`/forum-question`, data);
    return res.data;
  };
  updateQuestion = async (data: any) => {
    const res = await this.patchRequest(`/forum-question/${data.id}`, data);
    return res.data;
  };
  deleteQuestion = async (data: any) => {
    const res = await this.deleteRequest(`/forum-question/${data.id}`, {});
    return res.data;
  };
  createAnswer = async (data: any) => {
    const res = await this.postRequest(`/forum-answer`, data);
    return res.data;
  };
  updateAnswer = async (data: any) => {
    const res = await this.patchRequest(`/forum-answer/${data.id}`, data);
    return res.data;
  };
  deleteAnswer = async (data: any) => {
    const res = await this.deleteRequest(`/forum-answer/${data.id}`, {});
    return res.data;
  };
}
