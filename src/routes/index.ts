import express from 'express'
import AuthController from '../controllers/AuthenticationController'
const router = express.Router()

const initWebRoutes = (app: express.Application) => {
  /**
   * @swagger
   * /example:
   *   get:
   *     description: Get all examples
   *     responses:
   *       200:
   *         description: Success
   */
  router.get('/example', (req, res) => {
    res.send('Hello World!')
  })
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Đăng nhập
   *     description: Đăng nhập bằng tài khoản và mật khẩu
   *     tags:
   *       - Auth
   *     parameters:
   *       - name: email
   *         description: User's email
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: formData
   *         required: true
   *         type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Địa chỉ email
   *               password:
   *                 type: string
   *                 description: Mật khẩu
   *     responses:
   *       '200':
   *         description: Đăng nhập thành công
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT token
   *       '400':
   *         description: Đăng nhập thất bại
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Lỗi đăng nhập
   *       '500':
   *         description: Lỗi server
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Lỗi server
   */
  router.post('/auth/login', AuthController.handleLogin)

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Đăng ký
   *     description: Register a new user
   *     tags:
   *       - Auth
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         description: User's name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: email
   *         description: User's email
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: User created successfully
   *         schema:
   *           $ref: '#/definitions/User'
   *       400:
   *         description: Bad request
   *         schema:
   *           $ref: '#/definitions/Error'
   *       500:
   *         description: Internal server error
   *         schema:
   *           $ref: '#/definitions/Error'
   * definitions:
   *   User:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   *   Error:
   *     type: object
   *     properties:
   *       message:
   *         type: string
   *       code:
   *         type: integer
   */
  router.post('/auth/register', AuthController.handleRegister)

  return app.use('/', router)
}

export default initWebRoutes
