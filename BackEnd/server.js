const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./src/Routes/UserRoutes.js');
const caseRouter = require('./src/Routes/CreateCase.js');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())


app.use('/testing',(req,res)=>{
    return res.send('teting API')
})
app.use('/users', userRouter);
app.use('/case', caseRouter);
app.use('/', (req, res) => {
    res.send('no matching route');
});

mongoose.connect('mongodb+srv://nani80:wgn2a5f00kcCcnKX@cluster0.lmlw6oq.mongodb.net/SISDB?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
app.listen(5000);