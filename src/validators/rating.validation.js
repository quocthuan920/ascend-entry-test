import Joi from 'joi';

const createRatingSchema = Joi.object({
  movieId: Joi.string().required(),
  score: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional().allow(null, ''),
});

const updateRatingSchema = Joi.object({
  score: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional().allow(null, ''),
});

export { createRatingSchema, updateRatingSchema };