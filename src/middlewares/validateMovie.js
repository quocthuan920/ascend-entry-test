import { movieSchema } from '../validators/movie.validation.js';
import { responseError } from '../helpers/responseHelper.js';

const validateMovie = (req, res, next) => {
  const { error } = movieSchema.validate(req.body);
  if (error) {
    return responseError(res, error.details[0].message, 400);
  }
  next();
};

export default validateMovie;