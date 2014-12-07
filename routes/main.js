// # Site Routes 
// --------------------------------------
// contains all the routes of the site including pages, and rest api services.
//
// 1. Public Routes
// 2. Admin Routes
//
// requires
// * app
// * config
var app = module.parent.exports.app,
  config = module.parent.exports.config,
  anyandgo = module.parent.exports.anyandgo,
  // ## Models
  /* models:start */
  // Admins        = require('../models/admins.js'),
  Sample  = require('../models/sample.js'),
  Admins  = require('../models/admins.js'),
  Challenge  = require('../models/challenge.js'),
  Rule  = require('../models/rule.js'),
  Action  = require('../models/action.js'),
  Reward  = require('../models/reward.js'),
  Notification  = require('../models/notification.js'),
  NotificationTemplate  = require('../models/notificationtemplate.js'),
  LogAction  = require('../models/logaction.js'),
  LogReward  = require('../models/logreward.js'),
  LogChallenge  = require('../models/logchallenge.js'),
  User  = require('../models/user.js'),
  /* models:end */
  // ### Authorizers
  // Mantain certains part from the application secure
  // preventing not authenticated actors access to private parts 
  // according to their roles
  /* authorizers:start */
  adminAuth = require('../auth/admin-auth.js'),
  /* authorizers:end */
  /* forms:start */
  adminLoginForm = require('../forms/admin-login.js'),
  /* forms:end */
  restify = require('express-restify-mongoose'),
  mongooseForms = require('mongoose-forms'),
  Handlebars = require('handlebars'),
  shell = require('shelljs');
  // mongooseforms bind
  mongooseForms.bindHelpers(Handlebars, '../../../utils/formstemplates');

  /* models:registration:start */
  anyandgo.models['sample']  = Sample;
  anyandgo.models['challenge']  = Challenge;
  anyandgo.models['rule']  = Rule;
  anyandgo.models['action']  = Action;
  anyandgo.models['reward']  = Reward;
  anyandgo.models['notification']  = Notification;
  anyandgo.models['notificationtemplate']  = NotificationTemplate;
  anyandgo.models['logaction']  = LogAction;
  anyandgo.models['logreward']  = LogReward;
  anyandgo.models['logchallenge']  = LogChallenge;
  anyandgo.models['user']  = User;
  /* models:registration:end */











// ## 1. Public Routes
// --------------------------------------

// ### Home Page
app.get('/', function (req, res) {
    res.render('index', { title: 'Anyandgo', section: 'Home', user: req.user });
});

/* page:public:start */
  
// ### Contact Page
app.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact', section: 'Contact', user: req.user });
});

// ### Admin Page
app.get('/admin', function (req, res) {
    var form = mongooseForms.Bridge(new Admins(), new adminLoginForm()).getForm();
    var formHTML = Handlebars.helpers.renderForm(form);
    res.render('admin', { title: 'Admin', section: 'Admin', user: req.user, form: formHTML });
});

// ### terms-and-conditions Page
app.get('/terms-and-conditions', function (req, res) {
    res.render('terms-and-conditions', { title: 'terms-and-conditions', section: 'terms-and-conditions', user: req.user });
});
/* page:public:end */

// ## 2. Admin Routes
// --------------------------------------
// ### Login
app.get('/admin', function (req, res) {
    res.render('admin-index', { title: 'Anyandgo', section: 'Admin Login', user: req.user });
});

// ### Panel
app.get('/admin/config', function (req, res) {
    res.render('admin-config', { title: 'Anyandgo', section: 'Admin Panel', user: req.user });
});

// ### Panel
app.get('/admin/panel', 
    /* route:autorizers:start*/
    adminAuth.autorizer,
    /* route:autorizers:end */
    function (req, res) {
    res.render('admin-panel', { title: 'Anyandgo', section: 'Admin Panel', user: req.user });
});

// ## 3. Public Rest
// --------------------------------------
// https://github.com/florianholzapfel/express-restify-mongoose

// CORS Interceptors
if (config.cors && config.cors === "enabled") {
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.options('/api/v1/*', function(req, res){
    res.end();
  });
}

/* rest:public:start */

// GET /api/v1/samples
restify.serve(app, Sample, {
  lowercase: true,
  lean: false,
  prereq: adminAuth.rest.prereq,
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/challenges
restify.serve(app, Challenge, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/rules
restify.serve(app, Rule, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/actions
restify.serve(app, Action, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/rewards
restify.serve(app, Reward, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/notifications
restify.serve(app, Notification, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/notificationtemplates
restify.serve(app, NotificationTemplate, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/logactions
restify.serve(app, LogAction, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/logrewards
restify.serve(app, LogReward, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/logchallenges
restify.serve(app, LogChallenge, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});

// GET /api/v1/users
restify.serve(app, User, {
  lowercase: true,
  lean: false,
  prereq: function(req) {
    console.log("pre req");
    return true;
  },
  contextFilter: function(model, req, cb) {
    console.log("context filter");
    cb(model);
  },
  postProcess: function(req, res){
    console.log("post process");
  }
});
/* rest:public:end */












// ## 4. Crud Forms
// --------------------------------------
// https://github.com/oJshua/mongoose-forms
app.get('/forms/:modelname/create', function (req, res) {
    //mongooseForms.bindHelpers(Handlebars, 'bootstrap');
    var SampleForm = mongooseForms.Form(anyandgo.models[req.params.modelname]);
    /*
    SampleForm = SampleForm.eachField(function(field, name){
        console.log(">>", field, name);    
        if(name == "__v"){
           field.mapped = false;    
           console.log("->", field);
        }
        field.buttons = [{ sample: "lala"}];
    });
    */
    //delete SampleForm.options.fields["__v"];
    //SampleForm.options.maps["__v"] = false;
    console.log("----->>>", SampleForm);

    var ngBridge = function(model, form) {

      var bridge = {
        setModel: function(_model) {
          model = _model;
        },
        setForm: function(_form) {
          form = _form;
        },
        getForm: function() {
          
          form.eachMappedField(function(field, path) {
            field.value = model[path]; 
            field.ngmodel = req.params.modelname; 
            field.formname = "myForm"; 
            // Override type with ngoform setting
            if ( field.type.options.ngoform ) {
                field.type.instance = field.type.options.ngoform.control;
            }

          });

          delete form.options.fields["__v"];
          delete form.options.fields["created"];
          //form.options.fields["name"].template = 'Lala';
          form.options.fields["name"].buttons = [{type: 'submit'}];
          console.log(form.options.fields["name"]);
          return form;
        },
        getModel: function() {
          
          form.eachMappedField(function(field, path) {      
            model[path] = field.value;
          });

          return model;
        }
      };

      return bridge;
    };

    var form = ngBridge(new anyandgo.models[req.params.modelname](), SampleForm).getForm();
    //var form = mongooseForms.Bridge(new Sample(), SampleForm).getForm();
    var formHTMl = Handlebars.helpers.renderForm(form);
    
    console.log(formHTMl);
    res.render('forms', { title: 'Anyandgo', section: 'Form', user: req.user, form: formHTMl, mname: req.params.modelname });
});

app.get('/forms/sample/edit', function (req, res) {
    mongooseForms.bindHelpers(Handlebars, 'bootstrap');
    var SampleForm = mongooseForms.Form(Sample);
    Sample.findOne({}, function(err, doc){
        var form = mongooseForms.Bridge(doc, SampleForm).getForm();
        var formHTMl = Handlebars.helpers.renderForm(form);
    
        console.log(formHTMl);
        res.render('forms', { title: 'Anyandgo', section: 'Form', user: req.user, form: formHTMl });
    });
});

// ## 5. Super Admin Tasks
// --------------------------------------
app.get('/tasks/test', function (req, res) {
    shell.exec('./node_modules/mocha/bin/mocha --reporter doc', function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
        res.end(output);
    });
});
/*
// TODO: prevent auto-reboot when running with grunt, securitize mname parameter
app.get('/tasks/create/model/:mname', function (req, res) {
    shell.exec('grunt create:model:'+req.params.mname, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
        res.end(output);
    });
});
*/

