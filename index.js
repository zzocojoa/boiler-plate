const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");
const {User} = require("./models/User");

// application/xwww-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.urlencoded({extended: true}));

// application/json 이렇게 된 데이터를 분석해서 가져올 수 있게 해주는 것
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://zzocojoa:1q2w3e4r@boilerplate.rkyap.mongodb.net/?retryWrites=true&w=majority',
{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 새해 복 많이 받으세요!!!~~ LaLaLa~~~')
})

// 회원가입을 위한 register router(회원가입 기능)
app.post('/register', (req, res) => {

  // 회원 가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err})
    // status(200)은 성공했다는 표시
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

