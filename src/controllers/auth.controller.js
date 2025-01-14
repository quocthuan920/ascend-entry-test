import AuthenticationService from "../services/auth.service.js";
import BaseController from "./base.controller.js";

class AuthenticationController extends BaseController {
  async register(req, res, next) {
    try {
      return await AuthenticationService.register(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      return await AuthenticationService.login(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthenticationController();
