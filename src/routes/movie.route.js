import express from 'express';
import MovieController from '../controllers/movie.controller.js';
import passport from 'passport';
import validateMovie from '../middlewares/validateMovie.js';

const router = express.Router();

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

router.post('/', passport.authenticate('jwt', { session: false }), adminOnly, validateMovie, MovieController.create);
router.get('/:id', MovieController.read);
router.put('/:id', passport.authenticate('jwt', { session: false }), adminOnly, validateMovie, MovieController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), adminOnly, MovieController.delete);

router.get('/', MovieController.search);

router.get('/:id/ratings', MovieController.getRatings);
router.get('/top/rating-score', MovieController.getTopRatedMovies);

export default router;