const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const postsRouter = require('./routers/posts');
const serverError = require('./middlewares/server_error')
const error_404 = require('./middlewares/error_404')

app.listen(port, () => {
    console.log('Server is listening on http://localhost:' + port);
});

app.use(express.json());

app.use(express.static('public'))

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
    console.log('These are my posts')
})

app.use(serverError)


app.use('/posts', postsRouter);


app.use(error_404)

