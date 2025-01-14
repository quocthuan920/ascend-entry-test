import { updateRatingSchema, createRatingSchema } from '../validators/rating.validation.js';
import { responseError } from '../helpers/responseHelper.js';

const validateCreateRating = (req, res, next) => {
  const { error } = createRatingSchema.validate(req.body);
  if (error) {
    return responseError(res, error.details[0].message, 400);
  }
  next();
};

const validateUpdateRating = (req, res, next) => {
  const { error } = updateRatingSchema.validate(req.body);
  if (error) {
    return responseError(res, error.details[0].message, 400);
  }
  next();
};

export { validateCreateRating, validateUpdateRating };