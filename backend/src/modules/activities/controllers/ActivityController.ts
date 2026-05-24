import type { Request, Response } from "express";

import { ActivityService } from "../services/ActivityService.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

export class ActivityController {
  async index(request: Request, response: Response) {
    const service = new ActivityService();

    const activities = await service.listLatest(
      request.user.companyId
    );

    return response.json(
      ApiResponse.success(
        activities,
        "Atividades encontradas."
      )
    );
  }
}