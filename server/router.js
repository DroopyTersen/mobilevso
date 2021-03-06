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
    app.get("/help", (req, res) => res.send(getMarkup("help")));

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
    app.get("/iterationstats", authorize, (req, res) => res.send(getMarkup("iterationstats")));
    app.get("/teammate", authorize, (req, res) => res.send(getMarkup("teammate")));


    // API
    app.get("/api/projects", authorize, (req, res) => {
        api.getProjects(req.user)
            .then(projects => res.send(projects) )
            .catch(err => res.send(err))
    });

    app.get("/api/recentdone", authorize, (req, res) => {
        var name = req.query.name ? decodeURIComponent(req.query.name) : "";
        api.getRecentDone(req.user, req.query.project, name)
            .then(tasks => res.send(tasks) )
            .catch(err => res.send(err))
    });

    app.get("/api/opentasks", authorize, (req, res) => {
        var name = req.query.name ? decodeURIComponent(req.query.name) : "";
        api.getOpenTasks(req.user, req.query.project, name)
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
    
    app.get("/api/teammates", authorize, (req, res) => {
        var id = decodeURIComponent(req.query.projectId);
        var name = decodeURIComponent(req.query.projectName);
        api.getTeamMembers(req.user, { name, id })
            .then(apiRes => res.send(apiRes))
            .catch(err => res.send(err))
    })

    app.get("/api/burndown", authorize, (req, res) => {
        var id = decodeURIComponent(req.query.projectId);
        var name = decodeURIComponent(req.query.projectName);
        return api.getBurndown(req.user, { name, id }, data => res.send(data));
    })
    
}

exports.createRoutes = createRoutes;