const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ErrorHandling = require('./models/ErrorHandling');
const UserRoutes = require('./routes/users');
const ProjectRoutes = require('./routes/projects');
const ProjectTaskRoutes = require('./routes/projectTasks');
const mongoose = require('mongoose');
const {mongoURI} = require('./config/keys');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/api/users', UserRoutes);
app.use('/api/projects', ProjectRoutes);
app.use('/api/projects/projectTask', ProjectTaskRoutes);

app.use('/', (req,res,next)=> {
    next(new ErrorHandling('Specified route does not exist', 404));
});

app.use((error,req,res,next)=> {
    res.status(error.status).json({message: error.message});
})

mongoose.connect( mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    app.listen(4200);
    console.log('Server is listening on port 4200');
}).catch((err)=> console.log(err));