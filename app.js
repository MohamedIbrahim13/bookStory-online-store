const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const passport = require('passport');
const passportSetup = require('./config/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/stories');



// Load config
dotenv.config({path:'./config/config.env'});

connectDB();


// Views & Static Folders and  Parsing

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

app.use(session({
    secret :'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection:mongoose.connection})

}))

app.use(passport.initialize());
app.use(passport.session());

// Logging
if(process.env.NODE_ENV=== 'development'){
    app.use(morgan('dev'));
};

app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})

// Routes
app.use('/',indexRoutes);
app.use('/auth',authRoutes);
app.use('/stories',storyRoutes);

// Connect to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

