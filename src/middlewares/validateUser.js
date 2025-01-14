import { loginSchema, registerSchema } from '../validators/user.validation.js';
import { responseError } from '../helpers/responseHelper.js';

const validateLoginData = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return responseError(res, error.details[0].message, 400);
  }
  next();
};

const validateRegisterData = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return responseError(res, error.details[0].message, 400);
  }
  next();
};

export { validateLoginData, validateRegisterData };