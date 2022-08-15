// Imports
const express = require('express');
const logger = require('morgan');
const swaggerRouter = require('./routes/docs');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/users');
const commentRouter = require('./routes/users');
const categoryRouter = require('./routes/users');



const app = express();


app.use(express.json());
app.use(logger('dev'));
app.use("/docs",swaggerRouter);
app.use('api/v1/users',userRouter);
app.use('api/v1/articles',articleRouter);
app.use('api/v1/comments',commentRouter);
app.use('api/v1/categories',categoryRouter);



app.get('/',(req,res) => {
    res.status(200).json({
        status: "Success",
        message: "Blog project"
    });
})




const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log('Server listening on PORT : ' + PORT);
})


