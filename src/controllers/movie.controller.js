import MovieModel from "../models/movie.model.js";
import RatingModel from "../models/rating.model.js";
import { responseSuccess, responseError } from "../helpers/responseHelper.js";

class MovieController {
  /**
   * @openapi
   * '/api/v1/movies':
   *  post:
   *     tags:
   *     - Movie
   *     summary: Create a new movie
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - title
   *              - genre
   *              - releaseYear
   *            properties:
   *              title:
   *                type: string
   *                example: The Godfather
   *              genre:
   *                type: string
   *                example: Drama
   *              releaseYear:
   *                type: integer
   *                example: 1972
   *     responses:
   *      201:
   *        description: New movie created successfully
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
   *                  example: New movie created!
   *                data:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    title:
   *                      type: string
   *                      example: The Godfather
   *                    genre:
   *                      type: string
   *                      example: Drama
   *                    releaseYear:
   *                      type: integer
   *                      example: 1972
   *                    createdBy:
   *                      type: string
   *                      example: 5f5c330cde5a2f0017b67a01
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *      400:
   *        description: Invalid input data
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
   *                  example: title is required
   *      401:
   *        description: Unauthorized - Token required
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: fail
   *                message:
   *                  type: string
   *                  example: Unauthorized
   *      500:
   *        description: Internal Server Error
   */
  async create(req, res, next) {
    try {
      const { title, genre, releaseYear } = req.body;
      const createdBy = req.user._id;

      const newMovie = new MovieModel({
        title,
        genre,
        releaseYear,
        createdBy,
      });

      await newMovie.save();
      responseSuccess(res, "New movie created!", newMovie, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/movies/{id}':
   *  get:
   *     tags:
   *     - Movie
   *     summary: Get a movie by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           example: 678623494598f521a5b7644d
   *     responses:
   *      200:
   *        description: Movie found
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
   *                  example: Movie found!
   *                data:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    title:
   *                      type: string
   *                      example: The Godfather
   *                    genre:
   *                      type: string
   *                      example: Drama
   *                    releaseYear:
   *                      type: integer
   *                      example: 1972
   *                    createdBy:
   *                      type: string
   *                      example: 5f5c330cde5a2f0017b67a01
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *      404:
   *        description: Movie not found
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
   *                  example: Movie not found
   *      500:
   *        description: Internal Server Error
   */
  async read(req, res, next) {
    try {
      const movie = await MovieModel.findById(req.params.id).populate(
        "createdBy",
        "name email"
      );
      if (!movie) {
        return responseError(res, "Movie not found", 404);
      }
      responseSuccess(res, "Movie found!", movie);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/movies/{id}':
   *  put:
   *     tags:
   *     - Movie
   *     summary: Update a movie by ID
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
   *              title:
   *                type: string
   *                example: The Godfather
   *              genre:
   *                type: string
   *                example: Drama
   *              releaseYear:
   *                type: integer
   *                example: 1972
   *     responses:
   *      200:
   *        description: Movie updated successfully
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
   *                  example: Movie updated!
   *                data:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    title:
   *                      type: string
   *                      example: The Godfather
   *                    genre:
   *                      type: string
   *                      example: Drama
   *                    releaseYear:
   *                      type: integer
   *                      example: 1972
   *                    createdBy:
   *                      type: string
   *                      example: 5f5c330cde5a2f0017b67a01
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *      400:
   *        description: Invalid input data
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
   *                  example: title is required
   *      404:
   *        description: Movie not found
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
   *                  example: Movie not found
   *      500:
   *        description: Internal Server Error
   */
  async update(req, res, next) {
    try {
      const { title, genre, releaseYear } = req.body;
      const movie = await MovieModel.findByIdAndUpdate(
        req.params.id,
        { title, genre, releaseYear },
        { new: true }
      );
      if (!movie) {
        return responseError(res, "Movie not found", 404);
      }
      responseSuccess(res, "Movie updated!", movie);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/movies/{id}':
   *  delete:
   *     tags:
   *     - Movie
   *     summary: Delete a movie by ID
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
   *        description: Movie deleted successfully
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
   *                  example: Movie deleted!
   *      404:
   *        description: Movie not found
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
   *                  example: Movie not found
   *      500:
   *        description: Internal Server Error
   */
  async delete(req, res, next) {
    try {
      const movie = await MovieModel.findByIdAndDelete(req.params.id);
      if (!movie) {
        return responseError(res, "Movie not found", 404);
      }
      responseSuccess(res, "Movie deleted!");
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/movies':
   *  get:
   *     tags:
   *     - Movie
   *     summary: Search for movies
   *     parameters:
   *       - name: title
   *         in: query
   *         schema:
   *           type: string
   *           example: The Godfather
   *       - name: genre
   *         in: query
   *         schema:
   *           type: string
   *           example: Drama
   *       - name: releaseYear
   *         in: query
   *         schema:
   *           type: integer
   *           example: 1972
   *       - name: page
   *         in: query
   *         schema:
   *           type: integer
   *           example: 1
   *       - name: limit
   *         in: query
   *         schema:
   *           type: integer
   *           example: 10
   *     responses:
   *      200:
   *        description: Movies found
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
   *                  example: Movies found!
   *                data:
   *                  type: object
   *                  properties:
   *                    movies:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          _id:
   *                            type: string
   *                            example: 678623494598f521a5b7644d
   *                          title:
   *                            type: string
   *                            example: The Godfather
   *                          genre:
   *                            type: string
   *                            example: Drama
   *                          releaseYear:
   *                            type: integer
   *                            example: 1972
   *                          createdBy:
   *                            type: string
   *                            example: 5f5c330cde5a2f0017b67a01
   *                          createdAt:
   *                            type: string
   *                            format: date-time
   *                            example: 2025-01-14T08:41:45.607Z
   *                          updatedAt:
   *                            type: string
   *                            format: date-time
   *                            example: 2025-01-14T08:41:45.607Z
   *                    items:
   *                      type: integer
   *                      example: 1
   *                    total:
   *                      type: integer
   *                      example: 1
   *                    page:
   *                      type: integer
   *                      example: 1
   *                    pages:
   *                      type: integer
   *                      example: 1
   *      500:
   *        description: Internal Server Error
   */
  async search(req, res, next) {
    try {
      const { title, genre, releaseYear, page = 1, limit = 10 } = req.query;
      const query = {};

      if (title) query.title = { $regex: title, $options: "i" };
      if (genre) query.genre = { $regex: genre, $options: "i" };
      if (releaseYear) query.releaseYear = releaseYear;

      const movies = await MovieModel.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("createdBy", "name email");

      const total = await MovieModel.countDocuments(query);

      responseSuccess(res, "Movies found!", {
        movies,
        items: movies.length,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/movies/{id}/ratings':
   *  get:
   *     tags:
   *     - Movie
   *     summary: Get ratings for a movie
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *           example: 678623494598f521a5b7644d
   *     responses:
   *      200:
   *        description: Ratings found
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
   *                  example: Ratings found!
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      user:
   *                        type: object
   *                        properties:
   *                          name:
   *                            type: string
   *                            example: John Doe
   *                          email:
   *                            type: string
   *                            example: johndoe@mail.com
   *                      rating:
   *                        type: integer
   *                        example: 5
   *                      comment:
   *                        type: string
   *                        example: Great movie!
   *      404:
   *        description: Ratings not found
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
   *                  example: Ratings not found
   *      500:
   *        description: Internal Server Error
   */
  async getRatings(req, res, next) {
    try {
      const { id } = req.params;
      const ratings = await RatingModel.find({ movie: id }).populate(
        "user",
        "name email"
      );
      if (!ratings) {
        return responseError(res, "Ratings not found", 404);
      }
      responseSuccess(res, "Ratings found!", ratings);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/movies/top/rating-score':
   *  get:
   *     tags:
   *     - Movie
   *     summary: Get top rated movies
   *     responses:
   *      200:
   *        description: Ratings found
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
   *                  example: Top rated movies found!
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      user:
   *                        type: object
   *                        properties:
   *                          name:
   *                            type: string
   *                            example: John Doe
   *                          email:
   *                            type: string
   *                            example: johndoe@mail.com
   *                      rating:
   *                        type: integer
   *                        example: 5
   *                      comment:
   *                        type: string
   *                        example: Great movie!
   *      404:
   *        description: Top rated movies not found
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
   *                  example: Top rated movies not found
   *
   *      500:
   *        description: Internal Server Error
   */
  async getTopRatedMovies(req, res, next) {
    try {
      const { limit = 10 } = req.query;
      const movies = await MovieModel.find()
        .sort({ averageRating: -1 })
        .limit(parseInt(limit));

      if (!movies) {
        return responseError(res, "Top rated movies not found", 404);
      }
      responseSuccess(res, "Top rated movies found!", movies);
    } catch (error) {
      next(error);
    }
  }
}

export default new MovieController();
