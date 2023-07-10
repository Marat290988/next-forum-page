import { axiosReq } from './../axios/api';

export class ForumService {
  static async createForum(text: string, sectionId: number) {
    const response = await axiosReq({
      url: '/forum/create_forum',
      method: 'POST',
      data: {name: text, sectionId}
    });
    return response.data;
  }
  // static async getAllSections() {
  //   const response = await axiosReq({
  //     url: '/section/get_sections'
  //   });
  //   return response.data.sections;
  // }
}