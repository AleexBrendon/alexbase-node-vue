import { DashboardRepository } from "../repositories/DashboardRepository.js";

export class DashboardService {
  private repository = new DashboardRepository();

  async getDashboard(companyId: string) {
    return this.repository.getStats(companyId);
  }
}