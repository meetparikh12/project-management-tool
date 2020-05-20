const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', (req,res,next)=> {
    const error = new Error('Specified route does not exist.')
    error.statusCode = 404;
    next(error);
});

app.use((error,req,res,next)=> {
    res.status(error.statusCode).json({message: error.message});
})

app.listen(4200);
console.log('Server is listening on port 4200');