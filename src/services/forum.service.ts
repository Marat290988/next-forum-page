import { IForum } from '@/pages/forum';
import { axiosReq } from './../axios/api';
import { RequestCreateTopic } from '@/pages/api/forum/create_topic';

export class ForumService {
  static async createForum(text: string, sectionId: number, isInnerForum: boolean) {
    const response = await axiosReq({
      url: '/forum/create_forum',
      method: 'POST',
      data: {name: text, sectionId, isInnerForum}
    });
    return response.data;
  }
  static async getForumsByParent(parentId: string | number) {
    const response = await axiosReq({
      url: `/forum/${parentId}`
    });
    return response.data.forums;
  }
  static async getForumsByForumParent(parentId: string | number, page = 0, comment = 10): Promise<{forums: IForum[], isForum: boolean, themes: any[], totalRows: number}> {
    const response = await axiosReq({
      url: `/forum/get_forums/${parentId}` + `?p=${page}&c=${comment}`
    });
    return {forums: response.data.forums, isForum: response.data.isForum, themes: response.data.themes, totalRows: response.data.totalRows};
  }
  static async getForumById(forumId: string | number) {
    const response = await axiosReq({
      url: `/forum/get_forum/${forumId}`
    });
    return response.data.forum;
  }
  static async createTopic(topicData: RequestCreateTopic) {
    const response = await axiosReq({
      url: '/forum/create_topic',
      method: 'POST',
      data: topicData
    });
    return response.data;
  }
  static async deleteTopic(topicId: number) {
    const response = await axiosReq({
      url: '/forum/delete_topic/' + topicId,
      method: 'DELETE'
    });
    return response.data;
  }
  static async deleteForum(forumId: number) {
    const response = await axiosReq({
      url: '/forum/delete_forum/' + forumId,
      method: 'DELETE'
    });
    return response.data;
  }
  static async getForumsBySection(sectionId: number) {
    const response = await axiosReq({
      url: `/forum/${sectionId}`
    });
    return response.data.forums;
  }
}