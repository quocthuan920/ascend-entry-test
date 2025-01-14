import AuthenticationService from "../services/auth.service.js";

class AuthenticationController {
  /**
   * @openapi
   * '/api/v1/account/register':
   *  post:
   *     tags:
   *     - Authentication
   *     summary: Register a new user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - name
   *              - email
   *              - password
   *            properties:
   *              name:
   *                type: string
   *                default: John Doe
   *              email:
   *                type: string
   *                default: johndoe@mail.com
   *              password:
   *                type: string
   *                default: johnDoe20!@
   *     responses:
   *      200:
   *        description: User created successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *                message:
   *                  type: string
   *                  example: User created successfully
   *                user:
   *                  type: object
   *                  properties:
   *                    name:
   *                      type: string
   *                      example: Quốc Thuận
   *                    email:
   *                      type: string
   *                      example: nguyenquocthuan921@gmail.com
   *                    password:
   *                      type: string
   *                      example: $2b$10$UTAPSieT2NV2ZmU3WKL.Eer7TOej75yYkZp1wpD3CNL3/vB7Jwwzz
   *                    status:
   *                      type: string
   *                      example: active
   *                    verify:
   *                      type: boolean
   *                      example: false
   *                    role:
   *                      type: string
   *                      example: user
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    __v:
   *                      type: integer
   *                      example: 0
   *                token:
   *                  type: string
   *                  example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg2MjM0OTQ1OThmNTIxYTViNzY0NGQiLCJpYXQiOjE3MzY4NDQxMDU2MTIsImV4cCI6MTczNjg0NDE5MjAxMn0.ru8fOzw1nwDYQ1VfeWz-KptvylrvDWuSM6FcfWWS22MpQstyI-QSD-_Y-U-BXQhkS1gRRkvsvlZ8ouhNqX3ahmjTv911-UJQ_Pz9B82rWC3CMbG1oXEWzoIFdl-llKg6XCYw7c1ZT5ppjebRBldiB7S9K-7J166V4ywUulMPAfHW50zOSlIGCKVym9pqZO3vw6pIkTKPQ7-C2Y0J6hAseTLxUPD_0u5I6VXe740CKtD9h22rJ2YFjThlP-VH8eUJ7hGJgnI8DE5Ehdu3jks4umqq_BVLBZu5_bXfDgu9uvyvaEuz1zPWpZSylzxnlV9oTkhUCa2WayR76Ipwrmp5NQ
   *                expiresIn:
   *                  type: string
   *                  example: 1d
   *      400:
   *        description: User already exists
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: false
   *                message:
   *                  type: string
   *                  example: User already exists
   *      500:
   *        description: Internal Server Error
   */
  async register(req, res, next) {
    try {
      return await AuthenticationService.register(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @openapi
   * '/api/v1/account/login':
   *  post:
   *     tags:
   *     - Authentication
   *     summary: Login a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - email
   *              - password
   *            properties:
   *              email:
   *                type: string
   *                default: johndoe@mail.com
   *              password:
   *                type: string
   *                default: johnDoe20!@
   *     responses:
   *      200:
   *        description: Login successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: success
   *                message:
   *                  type: string
   *                  example: User created successfully
   *                user:
   *                  type: object
   *                  properties:
   *                    name:
   *                      type: string
   *                      example: Quốc Thuận
   *                    email:
   *                      type: string
   *                      example: nguyenquocthuan921@gmail.com
   *                    password:
   *                      type: string
   *                      example: $2b$10$UTAPSieT2NV2ZmU3WKL.Eer7TOej75yYkZp1wpD3CNL3/vB7Jwwzz
   *                    status:
   *                      type: string
   *                      example: active
   *                    verify:
   *                      type: boolean
   *                      example: false
   *                    role:
   *                      type: string
   *                      example: user
   *                    _id:
   *                      type: string
   *                      example: 678623494598f521a5b7644d
   *                    createdAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    updatedAt:
   *                      type: string
   *                      format: date-time
   *                      example: 2025-01-14T08:41:45.607Z
   *                    __v:
   *                      type: integer
   *                      example: 0
   *                token:
   *                  type: string
   *                  example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzg2MjM0OTQ1OThmNTIxYTViNzY0NGQiLCJpYXQiOjE3MzY4NDQxMDU2MTIsImV4cCI6MTczNjg0NDE5MjAxMn0.ru8fOzw1nwDYQ1VfeWz-KptvylrvDWuSM6FcfWWS22MpQstyI-QSD-_Y-U-BXQhkS1gRRkvsvlZ8ouhNqX3ahmjTv911-UJQ_Pz9B82rWC3CMbG1oXEWzoIFdl-llKg6XCYw7c1ZT5ppjebRBldiB7S9K-7J166V4ywUulMPAfHW50zOSlIGCKVym9pqZO3vw6pIkTKPQ7-C2Y0J6hAseTLxUPD_0u5I6VXe740CKtD9h22rJ2YFjThlP-VH8eUJ7hGJgnI8DE5Ehdu3jks4umqq_BVLBZu5_bXfDgu9uvyvaEuz1zPWpZSylzxnlV9oTkhUCa2WayR76Ipwrmp5NQ
   *                expiresIn:
   *                  type: string
   *                  example: 1d
   *      400:
   *        description: Invalid email or password
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: false
   *                message:
   *                  type: string
   *                  example: Invalid email or password
   *      500:
   *        description: Internal Server Error
   */
  async login(req, res, next) {
    try {
      return await AuthenticationService.login(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthenticationController();
