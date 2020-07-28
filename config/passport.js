const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const User = require('../models/User');

passport.serializeUser((user,done)=>{
    done(null,user.id)
});
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
});


passport.use(new GoogleStrategy({
    callbackURL:'/auth/google/callback',
    clientID:'148767384757-msookcsjkfc59c36ogile3g3m1vikk8p.apps.googleusercontent.com',
    clientSecret:'Jm7mbc4cfNrBb0hU9OUUPFK0'
},(accesToken,refreshToken,profile,done)=>{
    // console.log('Callback Function Fired');
    // console.log(profile);
    User.findOne({googleId:profile.id}).then((curr)=>{
        if(curr){
            console.log(`${curr} does exist`);
            done(null,curr);
        }else{
            // console.log(profile);
            new User({
                googleId:profile.id,
                displayName:profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image:profile._json.picture
            }).save().then((newUser)=>{
                console.log(`${newUser} has been created`);
                done(null,newUser);
            })
        }
    })
    
}));