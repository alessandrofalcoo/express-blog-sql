const express = require('express');
const router = express.Router()
const postsController = require('../controllers/posts_controller')

// Index
router.get('/', postsController.index)

// Show
router.get('/:slug', postsController.show)

// Store
router.post('/', postsController.store)

// Update
router.put('/:title', postsController.update) 


// Modify
router.patch('/:slug', postsController.modify) 


// Delete
router.delete('/:slug', postsController.destroy)


module.exports = router