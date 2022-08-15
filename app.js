// Imports
const express = require('express');
const logger = require('morgan');
const swaggerRouter = require('./routes/docs');




const app = express();


app.use(express.json());
app.use(logger('dev'));
app.use("/docs",swaggerRouter);

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


