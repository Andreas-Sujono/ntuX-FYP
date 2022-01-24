/* eslint-disable @typescript-eslint/no-unused-vars */
import { Id } from '../../../Models/Auth';
import BaseService from '../base';

export enum TaskType {
  FORUM_UPVOTE = 'FORUM_UPVOTE',
  TUTORING_REQUEST = 'TUTORING_REQUEST',
  TUTORING_ACCEPT = 'TUTORING_ACCEPT',
  COURSE_START = 'COURSE_START',
  COURSE_FINISH = 'COURSE_FINISH',
  PORTFOLIO_CREATE = 'PORTFOLIO_CREATE',
  REWARD_REDEEM = 'REWARD_REDEEM',
  REWARD_BUY_AVATAR = 'REWARD_BUY_AVATAR',
  REWARD_BUY_PREMIUM = 'REWARD_BUY_PREMIUM',

  // done handled
  FORUM_ASK_QUESTION = 'FORUM_ASK_QUESTION',
  FORUM_ANSWER_QUESTION = 'FORUM_ANSWER_QUESTION',
  PROFILE_LOGIN = 'PROFILE_LOGIN',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  REWARD_LEVEL_UP = 'REWARD_LEVEL_UP', //handled by FE
}

export default class PointsRewardsService extends BaseService {
  getGoalTask = async () => {
    const res = await this.getRequest('/goal-task/');
    return res.data;
  };

  getMyAchievements = async () => {
    const res = await this.getRequest('/goal-task/user');
    return res.data;
  };

  getMyNotifications = async () => {
    const res = await this.getRequest('/notifications');
    return res.data;
  };

  viewNotifications = async () => {
    const res = await this.patchRequest('/notifications/update-view', {});
    return res.data;
  };

  getAllRewards = async () => {
    const res = await this.getRequest('/reward?filter=isPublished||eq||true');
    return res.data;
  };

  getStudentRewards = async () => {
    const res = await this.getRequest('/reward?filter=isPublished||eq||true');
    return res.data;
  };

  createRewards = async (data: any) => {
    const res = await this.postRequest(`/reward/`, data);
    return res.data;
  };

  updateRewards = async (data: any) => {
    const res = await this.patchRequest(`/reward/${data.id}`, data);
    return res.data;
  };

  deleteRewards = async (id: Id) => {
    const res = await this.deleteRequest(`/reward/${id}`, {});
    return res.data;
  };

  getRewardsRedeemed = async (userId?: Id) => {
    const res = await this.getRequest(`/reward-redeemed`);
    return res.data;
  };
  getAvatars = async () => {
    const res = await this.getRequest(`/avatar`);
    return res.data;
  };

  createRewardsRedeemed = async (data: any) => {
    const res = await this.postRequest(`/reward-redeemed/`, data);
    return res.data;
  };

  updateRewardsRedeemed = async (data: any) => {
    const res = await this.patchRequest(`/reward-redeemed/${data.id}`, data);
    return res.data;
  };

  deleteRewardsRedeemed = async (id: Id) => {
    const res = await this.deleteRequest(`/reward-redeemed/${id}`, {});
    return res.data;
  };

  addWebsiteActivity = async (data: any) => {
    const res = await this.postRequest(`/website-activity`, data);
    return res.data;
  };
  buyAvatar = async (data: any) => {
    const res = await this.postRequest(`/avatar/buy/${data.id}`, data);
    return res.data;
  };
  useAvatar = async (data: any) => {
    const res = await this.postRequest(`/avatar/use/${data.id}`, data);
    return res.data;
  };
  redeemReward = async (data: any) => {
    const res = await this.postRequest(`/reward-redeemed`, data);
    return res.data;
  };

  checkGetPoint = async (taskType: TaskType) => {
    const res = await this.getRequest(
      `/goal-task/check-achievement?taskType=${taskType}`,
    );
    return res.data;
  };
}
