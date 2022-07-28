const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //스페이스를 없애주는 역할
        unique: 1 // 똑같은 이메일은 쓰지 못하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: Number,
        default: 0
    },
    role: { // 관리자 설정
        type: Number, // 예) number가 1이면 관리자, 2면 유저
        default: 0 // 임의로 role을 지정하지 않으면 0을 주겠다
    },
    image: String,
    token: { // token을 이용한 유효성 관리가능
        type: String,
    },
    tokenExp: { // token을 사용할 수 있는 기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}