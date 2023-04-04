import AuthService from "../services/AuthService"

const handleLogin = async (req: any, res: any) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing input parameter',
        })
    }
    let userData: any = await AuthService.handleUserLogin(email, password)
    return res.status(200).json({
        code: userData.code,
        message: userData.message,
        body: userData.body ? userData.body : null,
    })
}

const handleRegister = async (req: any, res: any) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    if (!name || !email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter',
        })
    }
    let userData: any = await AuthService.handleUserRegister(name, email, password)
    return res.status(200).json({
        code: userData.code,
        message: userData.message,
        body: userData.body ? userData.body : null,
    })
}

export {handleLogin, handleRegister}
const AuthController = {
    handleLogin: handleLogin,
    handleRegister: handleRegister
}
export default AuthController