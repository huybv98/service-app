import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserData} from "../types/user";

const handleUserLogin = (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData: UserData = {
                code: '0',
                message: '',
                body: undefined
            };
            let isExist = await checkUserEmail(email)
            if (!isExist) {
                userData.code = '401';
                userData.message = `Email hoặc mật khẩu không đúng.`;
            }
            let user = await User.findOne({email: email}, {email: 1, password: 1, _id: 1, name: 1});
            if (user) {
                let hash = await handleHashPassword(password)
                let check = bcrypt.compareSync(password, hash);
                if (!check) {
                    userData.code = '401';
                    userData.message = `Email hoặc mật khẩu không đúng.`;
                }else {
                    let payload = {
                        user: {
                            id: user.id
                        }
                    };

                    let token: string = jwt.sign(payload, process.env.SERVICE_APP_JWT_SECRET!) || '';
                    userData.code = '200';
                    userData.message = `Đăng nhập thành công`;
                    userData.body = {
                        email: user.email,
                        name: user.name,
                        token: token
                    }
                }
            } else {
                userData.code = '401';
                userData.message = `Email hoặc mật khẩu không đúng.`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}


const handleUserRegister = (name: string, email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {
                code: '0',
                message: '',
                body: undefined

            };
            let isExist = await checkUserEmail(email)
            if (isExist) {
                userData.code = '400';
                userData.message = `Email đã được đăng ký`;
                resolve(userData);
            }
            // hash password
            password = await handleHashPassword(password)
            // Tạo người dùng mới
            const user = new User({
                name,
                email,
                password
            });
            await user.save()
                .then(() => {
                    userData.code = '200';
                    userData.message = `Đăng ký thành công`;
                })
                .catch((error) => {
                    console.log("Error saving user", error);
                    userData.code = '400';
                    userData.message = `Đăng ký thất bại`;
                });
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

const checkUserEmail = (email: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({email: email});
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}
const handleHashPassword = (password: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        try {
            let saltRounds = parseInt(process.env.SERVICE_APP_SALT!)
            let salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (e) {
            reject(e);
        }
    })
}

const AuthService = {
    handleUserLogin: handleUserLogin,
    handleUserRegister: handleUserRegister
}
export default AuthService