import type { Request, Response } from "express";

import { DashboardService } from "../services/DashboardService.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class DashboardController {
  async index(request: Request, response: Response) {
    const service = new DashboardService();

    const dashboard = await service.getDashboard(
      request.user.companyId
    );

    return response.json(
      ApiResponse.success(
        dashboard,
        "Dashboard carregado com sucesso."
      )
    );
  }
}