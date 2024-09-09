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
// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// 스케줄 관련 라우트 사용
app.use('/', scheduleRoutes);


module.exports = app;