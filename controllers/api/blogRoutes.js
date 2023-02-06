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
    const oneBlog = await Blog.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(oneBlog)
  } catch(err) {
    res.status(400).json(err)
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