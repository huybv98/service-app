const user = {
    email: String,
    name: String,
    password: String
}
interface UserBody {
    email: string;
    name?: string;
    token: string;
}
interface UserData {
    code: string,
    message: string,
    body: UserBody | undefined;
}
export { user, UserData,  UserBody }