const router = require('express').Router()
const {User} = require('../models')
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    try {
  
      res.render('homepage', {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/dashboard', withAuth, async (req, res) => {
    try {
        let blogs = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: User
        })
        blogs = blogs.map(blog => blog.get({plain: true}))
        
        res.render('dashboard', {
            blogs,
            url: req.originalUrl,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  module.exports = router