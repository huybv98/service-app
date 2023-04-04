import AuthService from '../services/AuthService'
import { Request, Response } from 'express'

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
    return res.status(500).json({
      errCode: 1,
      message: 'Missing input parameter',
    })
  }
  const userData: any = await AuthService.handleUserRegister(name, email, password)
  return res.status(200).json({
    code: userData.code,
    message: userData.message,
    body: userData.body ? userData.body : null,
  })
}

export { handleLogin, handleRegister }
const AuthController = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
}
export default AuthController
