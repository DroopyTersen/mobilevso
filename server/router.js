var getMarkup = require('./html').getMarkup;
var api = require("./api");

// Middle ware to enforce signin
function authorize(req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect("/login");
} 

var createRoutes = function(app, passport) {

    var passportOptions = { 
        successRedirect: "/", 
        failureRedirect: "/login?failed=true"
    };

    app.get("/loginhelp", (req, res) => res.send(getMarkup("loginhelp")));

    // AUTHENTICATION
    app.get("/login", (req, res) => res.send(getMarkup("login")));
    app.post('/login', passport.authenticate('local', passportOptions));
    app.get("/signout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });

    // VIEWS
    app.get("/", authorize, (req, res) => res.send(getMarkup("mytasks")));
    app.get("/mytasks", authorize, (req, res) => res.send(getMarkup("mytasks")));
    app.get("/projects", authorize, (req, res) => res.send(getMarkup("projects")));


    // API
    app.get("/api/projects", authorize, (req, res) => {
        api.getProjects(req.user)
            .then(projects => res.send(projects) )
            .catch(err => res.send(err))
    });

    app.get("/api/mytasks", authorize, (req, res) => {
        api.getMyTasks(req.user, req.query.project)
            .then(tasks => res.send(tasks) )
            .catch(err => res.send(err))
    });

    app.get("/api/myrecentdone", authorize, (req, res) => {
        api.getMyRecentDone(req.user, req.query.project)
            .then(tasks => res.send(tasks) )
            .catch(err => res.send(err))
    });

    app.get("/api/tasks/:id/setState/:state", authorize, (req, res) => {
        api.setTaskState(req.user, req.params.id, req.params.state)
            .then(apiRes => res.send(apiRes))
            .catch(err => res.send(err))
    });

    app.get("/api/tasks/:id/setRemaining/:remaining", authorize, (req, res) => {
        api.setTaskRemaining(req.user, req.params.id, req.params.remaining)
            .then(apiRes => res.send(apiRes))
            .catch(err => res.send(err))
    });

    app.get("/api/tasks/:id/setIteration/:project", authorize, (req, res) => {
        api.setTaskIteration(req.user, req.params.id, req.params.project)
            .then(apiRes => res.send(apiRes))
            .catch(err => res.send(err))
    });
}

exports.createRoutes = createRoutes;