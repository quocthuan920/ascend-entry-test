import MovieModel from "../models/movie.model.js";
import RatingModel from "../models/rating.model.js";
import { responseSuccess, responseError } from "../helpers/responseHelper.js";

class RatingController {
  /**
   * @openapi
   * '/api/v1/ratings':
   *  post:
   *     tags:
   *     - Rating
   *     summary: Create a new rating
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - movieId
   *              - score
   *            properties:
   *              movieId:
   *                type: string
   *                example: 678623494598f521a5b7644d
   *              score:
   *                type: integer
   *                example: 5
   *              comment:
   *                type: string
   *                example: Great movie!
   *     responses:
   *      201:
   *        description: Rating created successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: true
   *                message:
   *                  type: string
   *                  example: Rating created!
   *                data:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    user:
   *                      type: string
   *                      example: 5f5c330cde5a2f0017b67a01
   *                    movie:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    score:
   *                      type: integer
   *                      example: 5
   *                    comment:
   *                      type: string
   *                      example: Great movie!
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *      400:
   *        description: Rating already submitted
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: false
   *                message:
   *                  type: string
   *                  example: Rating already submitted
   *      500:
   *        description: Internal Server Error
   */
  async create(req, res, next) {
    try {
      const { movieId, score, comment } = req.body;
      const userId = req.user._id;

      const existingRating = await RatingModel.findOne({
        user: userId,
        movie: movieId,
      });

      if (existingRating) {
        return responseError(res, "Rating already submitted", 400);
      }

      const newRating = new RatingModel({
        user: userId,
        movie: movieId,
        score,
        comment,
      });
      await newRating.save();

      const ratings = await RatingModel.find({ movie: movieId });
      const averageRating =
        ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length;

      await MovieModel.findByIdAndUpdate(movieId, { averageRating });

      responseSuccess(res, "Rating created!", newRating, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/ratings/{id}':
   *  get:
   *     tags:
   *     - Rating
   *     summary: Get a rating by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           example: 678623494598f521a5b7644d
   *     responses:
   *      200:
   *        description: Rating found
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: true
   *                message:
   *                  type: string
   *                  example: Rating found!
   *                data:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    user:
   *                      type: object
   *                      properties:
   *                        name:
   *                          type: string
   *                          example: John Doe
   *                        email:
   *                          type: string
   *                          example: johndoe@mail.com
   *                    movie:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    score:
   *                      type: integer
   *                      example: 5
   *                    comment:
   *                      type: string
   *                      example: Great movie!
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *      404:
   *        description: Rating not found
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: false
   *                message:
   *                  type: string
   *                  example: Rating not found
   *      500:
   *        description: Internal Server Error
   */
  async read(req, res, next) {
    try {
      const rating = await RatingModel.findById(req.params.id).populate(
        "user",
        "name email"
      );

      if (!rating) {
        return responseError(res, "Rating not found", 404);
      }

      responseSuccess(res, "Rating found!", rating);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/ratings/{id}':
   *  put:
   *     tags:
   *     - Rating
   *     summary: Update a rating by ID
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           example: 678623494598f521a5b7644d
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            properties:
   *              score:
   *                type: integer
   *                example: 5
   *              comment:
   *                type: string
   *                example: Great movie!
   *     responses:
   *      200:
   *        description: Rating updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: true
   *                message:
   *                  type: string
   *                  example: Rating updated!
   *                data:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    user:
   *                      type: string
   *                      example: 5f5c330cde5a2f0017b67a01
   *                    movie:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    score:
   *                      type: integer
   *                      example: 5
   *                    comment:
   *                      type: string
   *                      example: Great movie!
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *      404:
   *        description: Rating not found
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: false
   *                message:
   *                  type: string
   *                  example: Rating not found
   *      500:
   *        description: Internal Server Error
   */
  async update(req, res, next) {
    try {
      const { score, comment } = req.body;
      const userId = req.user._id;

      const rating = await RatingModel.findById(req.params.id).populate(
        "user",
        "_id"
      );

      if (!rating || (rating.user._id.toString() !== userId.toString())) {
        return responseError(res, "Rating not found", 404);
      }
      const movieId = rating.movie;
      rating.score = score;
      rating.comment = comment;
      await rating.save();

      const ratings = await RatingModel.find({ movie: movieId });
      const averageRating =
        ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length;

      await MovieModel.findByIdAndUpdate(movieId, { averageRating });

      responseSuccess(res, "Rating updated!", rating);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/ratings/{id}':
   *  delete:
   *     tags:
   *     - Rating
   *     summary: Delete a rating by ID
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           example: 678623494598f521a5b7644d
   *     responses:
   *      200:
   *        description: Rating deleted successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: true
   *                message:
   *                  type: string
   *                  example: Rating deleted!
   *      404:
   *        description: Rating not found
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                success:
   *                  type: boolean
   *                  example: false
   *                message:
   *                  type: string
   *                  example: Rating not found
   *      500:
   *        description: Internal Server Error
   */
  async delete(req, res, next) {
    try {
      const rating = await RatingModel.findById(req.params.id).populate(
        "user",
        "_id"
      );
      const movieId = rating.movie;

      if (!rating || (rating.user._id.toString() !== req.user._id.toString())) {
        return responseError(res, "Rating not found", 404);
      }

      //delete rating
      await rating.deleteOne();

      const ratings = await RatingModel.find({ movie: movieId });
      const averageRating = ratings.length
        ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
        : 0;

      await MovieModel.findByIdAndUpdate(movieId, { averageRating });

      responseSuccess(res, "Rating deleted!");
    } catch (error) {
      next(error);
    }
  }
}

export default new RatingController();