import Joi from 'joi';

const movieSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  releaseYear: Joi.number().integer().min(1888).required(), // The first film was made in 1888
});

export { movieSchema };