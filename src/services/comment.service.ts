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

  static async getCommentsByTopicId(topicId: number, page = 0, comment = 10) {
    const response = await axiosReq({
      url: '/comment/get_comment_by_topic/' + topicId + `?p=${page}&c=${comment}`
    });
    return response.data;
  }

  static async deleteCommentByid(commentdId: number) {
    const response = await axiosReq({
      url: '/comment/delete/' + commentdId,
      method: 'DELETE'
    });
    return response.data;
  }

  static async getLastCommentByUserId(userId: number) {
    const response = await axiosReq({
      url: '/comment/get_last_comments_by_userid/' + userId
    });
    return response.data;
  }

  static async getLink(topicId: number, commentId: number) {
    const response = await axiosReq({
      url: '/comment/comment_link',
      method: 'POST',
      data: {topic_id: topicId, comment_id: commentId}
    });
    return response.data;
  }
}