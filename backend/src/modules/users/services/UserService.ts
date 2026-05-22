import { UserRepository } from "../repositories/UserRepository.js";

export class UserService {
  private userRepository = new UserRepository();

  async listUsers(params: { page: number; perPage: number; skip: number }) {
    const result = await this.userRepository.findAll({
      skip: params.skip,
      perPage: params.perPage,
    });

    return {
      data: result.users,
      meta: {
        page: params.page,
        perPage: params.perPage,
        total: result.total,
        totalPages: Math.ceil(result.total / params.perPage),
      },
    };
  }
}