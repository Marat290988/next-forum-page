import { axiosReq } from './../axios/api';

export class AuthService {
  static async register(data: any) {
    const response = await axiosReq({
      url: '/auth',
      method: 'POST',
      data
    });
    return response.data;
  }

  static async login(data: any) {
    const response = await axiosReq({
      url: '/login',
      method: 'POST',
      data
    });
    return response.data;
  }
}