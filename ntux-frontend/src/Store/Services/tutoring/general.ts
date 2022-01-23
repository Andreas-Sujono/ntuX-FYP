import BaseService from '../base';

export default class TutoringService extends BaseService {
  getAllTutor = async (query?: string) => {
    query = query || '';
    const res = await this.getRequest(`/tutor?query=${query}`);
    return res.data;
  };

  checkSelfTutor = async () => {
    const res = await this.getRequest('/tutor/check-self');
    return res.data;
  };

  updateSelfTutor = async (data: any) => {
    const res = await this.patchRequest(`/tutor/${data.id}`, data);
    return res.data;
  };

  getMyRequests = async () => {
    const res = await this.getRequest(`/tutor-request/request`);
    return res.data;
  };

  getMyOffers = async () => {
    const res = await this.getRequest(`/tutor-request/offer`);
    return res.data;
  };

  createRequest = async (data: any) => {
    const res = await this.postRequest(`/tutor-request/request`, data);
    return res.data;
  };

  updateRequest = async (data: any) => {
    const res = await this.patchRequest(`/tutor-request/request`, data);
    return res.data;
  };

  updateOffer = async (data: any) => {
    const res = await this.patchRequest(`/tutor-request/offer`, data);
    return res.data;
  };

  getAllReviews = async (tutorId: any) => {
    const res = await this.getRequest(`/tutor/${tutorId}/review`);
    return res.data;
  };

  getAllChats = async (tutorRequestId: any) => {
    const res = await this.getRequest(`/tutor-request/${tutorRequestId}/chat`);
    return res.data;
  };

  createReview = async (data: any) => {
    const res = await this.postRequest(
      `/tutor-request/${data.tutorRequest}/review`,
      data,
    );
    return res.data;
  };

  createChat = async (data: any) => {
    const res = await this.postRequest(
      `/tutor-request/${data.tutorRequest}/chat`,
      data,
    );
    return res.data;
  };
}
