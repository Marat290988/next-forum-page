import { axiosReq } from './../axios/api';

export class SectionService {
  static async createSection(text: string) {
    const response = await axiosReq({
      url: '/section/create_section',
      method: 'POST',
      data: {name: text}
    });
    return response.data;
  }
  static async getAllSections() {
    const response = await axiosReq({
      url: '/section/get_sections'
    });
    return response.data.sections;
  }
  static async deleteSection(sectionId: number) {
    const response = await axiosReq({
      url: '/section/delete_section/' + sectionId,
      method: 'DELETE'
    });
    return response.data;
  }
}