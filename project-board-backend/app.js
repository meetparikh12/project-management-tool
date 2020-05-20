const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ErrorHandling = require('./models/ErrorHandling');
const UserRoutes = require('./routes/users');

app.use(bodyParser.json());

app.use('/api/users', UserRoutes);

app.use('/', (req,res,next)=> {
    next(new ErrorHandling('Specified route does not exist', 404));
});

app.use((error,req,res,next)=> {
    res.status(error.status).json({message: error.message});
})

app.listen(4200);
console.log('Server is listening on port 4200');