const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js')

const app = express();
app.use(express.json());
app.use(cors());

/////////////////////////////////////PORT CONFIG
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});

/////////////////////////////////////DATABASE CONFIG
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

/////////////////////////////////////////////////////////////////////////////////////
//User apis
//Save user
var User = require('./Models/User');
app.post('/user/save', async (req, res) => {
    console.log("Saving the User "+ req.body.name);
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
    var new_user = new User({
        password: hashedPassword,        
    });
    new_user.name =  {
        type: String,
        required: true,
    }, req.body.name;
    new_user.email = {
        type: String,
        required: true,
        unique: true
    }, req.body.email;
    new_user.password =  {
        type: String,
        required: true,
    }, req.body.password;
    database.useDb('users')
    try{
        const user = await User.find({'email':req.body.email}).exec()
        if(!user || user.length === 0) {
            new_user.save()
            res.status(200).send('Saved Successfully!');
        }else{
            res.status(500).send('User already present'); 
        }
    }catch(e){
        console.log(e);
    }
  });
//Validate user
app.post('/user/find', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ 'email': req.body.email }).exec();
        
        // If user not found, send an appropriate response
        if (!user) {
            return res.status(401).send('Invalid Credentials');
        }

        // Compare passwords
        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
        
        if (!isPasswordMatched) {
            return res.status(401).send('Invalid Credentials');
        }

        // If password matches
        console.log("User is present in the DB" + user.email);
        res.status(200).send('Authentication Successful');
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});


/////////////////////////////////////////////////////////////////////////////////////
//Quiz apis
var Quiz = require('./Models/Quiz')
//Create a Quiz
app.post('/quiz/create', async (req,res) =>{
    try{
        const quiz = new Quiz(req.body);
        quiz.quiz_id = Math.floor(Math.random(1000)*1000)
        quiz.created_date = new Date()
        await quiz.save();
        res.status(201).send(quiz);
    } catch(err){
        res.status(400).send(err);
    }
});

//Get a quiz
app.get('/quiz/getDetails', async (req,res) =>{
    const { user_email, quiz_id } = req.query;
  
  try {
    const quizzes = await Quiz.find({ user_email, quiz_id });
    if (quizzes.length === 0) {
      return res.status(404).send({ message: 'No quizzes found' });
    }
    res.send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete a quiz
app.delete('/quiz/delete', async (req,res) => {
    const { user_email, quiz_id } = req.query;

    try{
        await Quiz.deleteOne({user_email, quiz_id })
        res.status(200).status(done);
    }catch (error) {
        res.status(500).send(error);
    }

});

//Take a quiz
// app.post('/quiz/takeQuiz', async (req,res) => {
//     const quiz_id = req.query.quiz_id;
//     const submittedQuiz = req.body;
//     try{
//         const quiz = await Quiz.find({ quiz_id });
//         for( var i=0;i<submittedQuiz.questions.length;i++){
//             var attemptedQuestion = submittedQuiz[i].question
//             var attemptedAnswer = submittedQuiz[i].option_marked
//             for(var j=0;j<quiz.questions.length;j++){
//                 var temp = quiz.questions[j].question;
//                 if(temp==attemptedQuestion){
//                     for(var k=0;k<temp.options.length;k++){
//                         if(temp.options[k].title==attemptedAnswer){
//                             if(temp.options[k].is_correct){
//                                 quiz.questions[j].answered_correctly++;
//                             }else{
//                                 quiz.questions[j].answered_incorrectly++;
//                             }
//                         }
//                     }
//                 }
//                 quiz.questions[j].attempted++;
//             }
//         }
//         await Quiz.updateOne(quiz)
//     }catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }  

// });

/////////////////////////////////////////////////////////////////////////////////////
//Analytics api
app.get('/analytics/getAllQuiz', async (req,res) =>{
    try {
        //@@TODO to data question wise analysis
        const user_email = req.query.user_email;
        const quizzes = await Quiz.find({ user_email });
        res.status(200).send(quizzes);
    }catch(err){
        res.status(500).send(err);
    }
});

/////////////////////////////////////////////////////////////////////////////////////
//Dashboard api
app.get('/dashboard/getDetails', async (req,res) =>{
    try{
        const user_email = req.query.user_email;
        const quizzes = await Quiz.find({ user_email })
        const quizCreated = quizzes.length;
        var questionsCreated = 0;
        var totalImpression = 0;

        for (var i=0; i<quizzes.length; i++){
            questionsCreated += quizzes[i].questions.length;
            totalImpression += quizzes[i].impression_count;
        }
        res.status(200).send({'quizCreated':quizCreated,'questionsCreated':questionsCreated, 'totalImpression':totalImpression,'trendingQuiz':quizzes.filter((quiz) => quiz.impression_count>10).sort(quizzes.impression_count)});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});