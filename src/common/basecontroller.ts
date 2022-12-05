import { Controller, Get } from '@nestjs/common';
/**
 * This is base controller.
 * It can be used to declare common API or common funtions used across all controller.
 */
@Controller()
export class BaseController {
  /**
   * This is health check API used in every service at istio level to check the health of microservice.
   * @returns This methis will return 'success' as response
   */
  @Get('/service/health')
  async healthCheck() {
    return 'success';
  }
}
