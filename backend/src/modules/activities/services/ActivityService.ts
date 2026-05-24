import { ActivityRepository } from "../repositories/ActivityRepository.js";

export class ActivityService {
  private repository = new ActivityRepository();

  async createActivity(data: {
    type: string;
    title: string;
    description?: string;
    userId?: string;
    userName?: string;
    companyId: string;
  }) {
    return this.repository.create(data);
  }

  async listLatest(companyId: string) {
    return this.repository.findLatest(companyId, 10);
  }
}