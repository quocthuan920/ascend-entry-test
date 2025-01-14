import express from 'express';
import RatingController from '../controllers/rating.controller.js';
import passport from 'passport';
import {validateCreateRating, validateUpdateRating} from '../middlewares/validateRating.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), validateCreateRating, RatingController.create);
router.get('/:id', RatingController.read);
router.put('/:id', passport.authenticate('jwt', { session: false }), validateUpdateRating, RatingController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), RatingController.delete);

export default router;