const jwtStrategy  = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {};

opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = pass => {
    pass.use(new jwtStrategy(opts,(jwt_payload,done)=>{
      User.findById(jwt_payload.id)
          .then(user=>{
              if(user){
                  return done(null,user);
              }
              return (null,false)
          })
          .catch(err=>{
              console.log(err);
          })
    }));
};
