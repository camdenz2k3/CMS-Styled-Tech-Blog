const router = require('express').Router()
const {Blog} = require('../../models')


router.get('/', async (req, res) => {
  try {
    const everyBlog = await Blog.findAll()
    res.status(200).json(everyBlog)
  } catch(err) {
    res.status(400).json(err)
  }
})


router.get('/:id', async (req, res) => {
  try {
    let blog = await Blog.findOne({
        where: {
            id: req.params.id
        },
        include: [User, Comment]
    })
    blog = blog.get({plain: true})
    
    let comments = await Comment.findAll({
        where: {
            blog_id: req.params.id
        },
        include: [User, Blog]
    })
    comments = comments.map(comment => comment.get({plain: true}))
  
    res.render('blog', {
        blog,
        comments,
        logged_in: req.session.logged_in
    })
} catch(err) {
    res.status(500).json(err)
}
})

router.post('/', async (req, res) => {
    try {
        const createBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(createBlog)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
      const updateBlog = await Blog.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(updateBlog)
    } catch (err) {
      res.status(400).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const deleteBlog = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      })
      
      res.status(200).json(deleteBlog)
    } catch (err) {
      res.status(500).json(err)
    }
})

module.exports = router