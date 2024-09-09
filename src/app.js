// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// 스케줄 관련 라우트 사용
app.use('/', scheduleRoutes);

module.exports = app;