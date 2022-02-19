const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');  // 로그 확인 위한 morgan
const path = require('path');

const app = express();
require('./database');

const PORT = process.env.PORT || 3000;
// process.env 파일 내의 PORT 값을 가져오고 없다면 3000으로 설정

app.listen(PORT, () => {
  console.log(`Listening on 'http://localhost:${PORT}'`);
});

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

const mainrouters = require('./routers/router');
const postRouter = require('./routers/postRouter');

// Read Body (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainrouters);
app.use('/board', postRouter);


