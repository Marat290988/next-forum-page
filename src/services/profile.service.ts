import { axiosReq } from "@/axios/api";

export class ProfileService {
  static async getAllPics() {
    const response = await axiosReq({
      url: '/profile/get_all_pics'
    });
    return response.data;
  }
  static async updatePic(imgUrl: string) {
    const response = await axiosReq({
      url: '/profile/change_pic',
      method: 'POST',
      data: {imgUrl}
    });
    return response.data;
  }
}