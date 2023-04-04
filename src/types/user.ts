interface user {
  email?: string
  name?: string
  password?: string
}
interface UserBody {
  email: string
  name?: string
  token: string
}
interface UserData {
  code: string
  message: string
  body: UserBody | undefined
}
export { user, UserData, UserBody }
