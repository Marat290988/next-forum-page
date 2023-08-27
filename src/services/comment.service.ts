import { axiosReq } from './../axios/api';

export class CommentService {
  static async sendComment(text: string, topicId: number, forumId: number) {
    const response = await axiosReq({
      url: '/comment/create_comment',
      method: 'POST',
      data: {text, topicId, forumId}
    });
    return response.data;
  }
}