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
  static async getForumsByForumParent(parentId: string | number): Promise<{forums: IForum[], isForum: boolean, themes: any[]}> {
    const response = await axiosReq({
      url: `/forum/get_forums/${parentId}`
    });
    return {forums: response.data.forums, isForum: response.data.isForum, themes: response.data.themes};
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
}