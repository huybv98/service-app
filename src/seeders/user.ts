import User from 'models/user'

// Thêm mới một User vào bảng
const user = new User({
  name: 'Bùi Văn Huy',
  email: 'buihuy22yo@gmail.com',
  password: '123456',
})

const saveOptions = { validateBeforeSave: true }
user
  .save(saveOptions)
  .then(() => {
    console.log('User saved successfully')
  })
  .catch((error) => {
    console.log('Error saving user', error)
  })
