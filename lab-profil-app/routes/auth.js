const express    = require('express');
const authRoutes = express.Router();
 
const bcrypt     = require('bcryptjs');
 
// require the user model !!!!
const User       = require('../models/User.model');

/*SIGNUP */


authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const campus = req.body.campus;
    const course = req.body.course;
    
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
   
    if (password.length < 7) {
      res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
      return;
    }
    
    User.findOne({ username })
      .then(foundUser => {
        if (foundUser) {
          res.status(400).json({ message: 'Username taken. Choose another one.' });
          return;
        }
      
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
      
        const aNewUser = new User({
          username:username,
          password: hashPass,
          campus:campus,
          course:course,
        });
      
        aNewUser.save()
          .then(() => {
            // Persist our new user into session
            req.session.currentUser = aNewUser
   
           res.status(200).json(aNewUser);
          })
          .catch(err => {
            res.status(400).json({ message: 'Saving user to database went wrong.' });
          })
        ;
      })
      .catch(err => {
        res.status(500).json({message: "Username check went bad."});
      })
    ;
  });


/*LOGIN*/

authRoutes.post('/login', (req, res, next) => {
    const {username, password} = req.body
   
    User.findOne({username}).then(user => {
      if (!user) {
        return next(new Error('No user with that email'))
      }
      
      // compareSync
      if (bcrypt.compareSync(password, user.password) !== true) {
        return next(new Error('Wrong credentials'))
      } else {
        req.session.currentUser = user
        res.json(user)
      }
    }).catch(next)
  });

  
/*EDIT*/

authRoutes.post('/edit', (req, res, next) => {
    //check si user connecté
    //si pas co json erreur
    //si co mise a jour de l'enregistrement avec les data de req.body
    if (!req.session.currentUser) {
        res.status(403).json({message: 'Forbidden' })
        return;
    } 
    const {username, campus, course} = req.body

    
    User.update(
        { _id: req.session.currentUser._id },
        {
            username: username,
            campus: campus,
            course: course   
        }
      )
        .then( ()=> res.status(200).json({message: 'Updated' }))
  

  });


/*LOGOUT*/

authRoutes.post('/logout', (req, res, next) => {
    req.session.destroy()
    res.json({message: 'Your are now logged out.'})
  });

/*LOGGEDIN*/

authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.session.currentUser) {
        res.status(200).json(req.session.currentUser);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
  });


  module.exports = authRoutes;



