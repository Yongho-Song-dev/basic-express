const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');  // 로그 확인 위한 morgan
const path = require('path');

// google 소셜 로그인
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const app = express();
require('./database');

const mainrouters = require('./routers/router');
const postRouter = require('./routers/postRouter');
const authRouter = require('./routers/authRouter');

const PORT = process.env.PORT || 3000;
// process.env 파일 내의 PORT 값을 가져오고 없다면 3000으로 설정

app.listen(PORT, () => {
  console.log(`Listening on 'http://localhost:${PORT}'`);
});

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });


app.use(morgan('dev'));

// Read Body (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET_KEY,
  cookie: { maxAge: 60 * 2 * 1000 },
  resave: true,
  saveUninitiliazed: false
}));

app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routers/*.js", './swagger/*'],
};


const specs = swaggerJsdoc(options);

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (id, done) {
  done(null, id);
});

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:3000/login/google/callback",
  passReqToCallback: true,
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);

    return done(null, profile);
  }
));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  

// app.use('/', mainrouters);
app.use('/board', postRouter);
app.use('/', authRouter);

app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);