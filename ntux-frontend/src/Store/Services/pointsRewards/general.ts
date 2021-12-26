import { Id } from '../../../Models/Auth';
import BaseService from '../base';

export default class PointsRewardsService extends BaseService {
  getGoalTask = async () => {
    const res = await this.getRequest('/goal-task/');
    return res.data;
  };

  getAllRewards = async () => {
    const res = await this.getRequest('/rewards');
    return res.data;
  };

  getStudentRewards = async () => {
    const res = await this.getRequest('/rewards?filter=isPublished||eq||true');
    return res.data;
  };

  createRewards = async (data: any) => {
    const res = await this.postRequest(`/rewards/`, data);
    return res.data;
  };

  updateRewards = async (data: any) => {
    const res = await this.patchRequest(`/rewards/${data.id}`, data);
    return res.data;
  };

  deleteRewards = async (id: Id) => {
    const res = await this.deleteRequest(`/rewards/${id}`, {});
    return res.data;
  };

  getRewardsRedeemed = async (userId: Id) => {
    const res = await this.getRequest(
      `/rewards-redeemed?filter=user||eq||${userId}`,
    );
    return res.data;
  };

  createRewardsRedeemed = async (data: any) => {
    const res = await this.postRequest(`/rewards-redeemed/`, data);
    return res.data;
  };

  updateRewardsRedeemed = async (data: any) => {
    const res = await this.patchRequest(`/rewards-redeemed/${data.id}`, data);
    return res.data;
  };

  deleteRewardsRedeemed = async (id: Id) => {
    const res = await this.deleteRequest(`/rewards-redeemed/${id}`, {});
    return res.data;
  };
}
