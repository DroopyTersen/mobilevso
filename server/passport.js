 var LocalStrategy = require("passport-local");
 var vsoFactory = require('./vso');

 var setupPassport = function(passport) {
   
     passport.serializeUser((user, done) => {
         var userStr = JSON.stringify({ authHash: user.authHash, host: user.host })
         done(null, userStr);
    });

     passport.deserializeUser(function(userStr, done) {
         done(null, JSON.parse(userStr));
     });

    var authHashCreator = (req, user, pwd, done) => {
        var host = req.body.host;
        var authHash = new Buffer(user + ":" + pwd).toString('base64');
        vsoFactory.create(authHash, host).projects()
        	.then(projects => {
                return (projects && projects.value) ? done(null, { authHash, host }) : done(null, false);
            })
        	.catch(error => {
                if (error.statusCode === 401) {
                    //Valid user but invalid pwd
                    return done(null, false);
                }
                return done(error, false);
            })
        
    }
    
    passport.use(new LocalStrategy({ passReqToCallback: true }, authHashCreator))
 };

exports.setupPassport = setupPassport;