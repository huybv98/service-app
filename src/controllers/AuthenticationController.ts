import AuthService from '@src/services/AuthService'
import { Request, Response } from 'express'
import responseApi from '@src/utils/supports/responseApi'

const handleLogin = async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password
  if (!email || !password) {
    return res.status(500).json({
      code: 1,
      message: 'Missing input parameter',
    })
  }
  const userData: any = await AuthService.handleUserLogin(email, password)
  return res.status(200).json({
    code: userData.code,
    message: userData.message,
    body: userData.body ? userData.body : null,
  })
}

const handleRegister = async (req: Request, res: Response) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  if (!name || !email || !password) {
    return responseApi.responseFail(res, ' Missing input parameter')
  }
  const userData: any = await AuthService.handleUserRegister(name, email, password)
  return responseApi.responseSuccess(res, userData.code, userData.message, userData.body)
}

export { handleLogin, handleRegister }
const AuthController = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
}
export default AuthController
