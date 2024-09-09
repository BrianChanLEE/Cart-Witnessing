// server.js
const app = require('./src/app');
const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});