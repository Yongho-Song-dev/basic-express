var mongoose = require('mongoose');
require('dotenv').config();

// mongodb connect
mongoose.connect(process.env.MONGO_URL);


var db = mongoose.connection;

const handleConnection = ()=>{
    console.log('Connected to Mongo DB with Atlas');
};

const handleError = (err) => {
    console.log(`error occures ${err}`);
}; 

// 정상 연결시 open
db.once('open', handleConnection);
// connect 실패시
db.on('error', handleError);