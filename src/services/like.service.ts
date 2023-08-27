import { axiosReq } from './../axios/api';

export class LikeService {
  static async toggleLike(stars: number, commentId: number) {
    const response = await axiosReq({
      url: '/comment/like',
      method: 'POST',
      data: {stars, commentId}
    });
    return response.data;
  }
}