const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");
const {User} = require("./models/User");

const config = require('./config/key')

// application/xwww-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));

// application/json 이렇게 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,
{
  // 6.0 version update 이후 사용 하지 않아도 작동 가능
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Renewal!~')
})

// 회원가입을 위한 register router(회원가입 기능)
app.post('/register', (req, res) => {

  // 회원 가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어줌.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    // status(200)은 성공했다는 표시(postman 출력)
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

