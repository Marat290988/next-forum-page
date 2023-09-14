import { axiosReq } from "@/axios/api";
import { UrlPath } from "@/enum/url-path.enum";

export class NavService {
  static async getNav(id: number, type: UrlPath): Promise<{id: number, title: string, url: string}[]> {
    const response = await axiosReq({
      url: '/nav',
      method: 'POST',
      data: {id, type}
    });
    return response.data.nav;
  }
}