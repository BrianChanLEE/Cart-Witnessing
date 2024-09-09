// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 정적 파일 서빙 설정
app.use(express.static('public'));
// 스케줄 관련 라우트 사용
app.use('/', scheduleRoutes);


module.exports = app;