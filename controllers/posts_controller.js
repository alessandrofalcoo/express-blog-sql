const posts = require('../data/posts')

function index(req, res) {
    const tag = req.query.tags
    const filteredPost = posts.filter((thisPost) => thisPost.tags && thisPost.tags.includes(tag))
    if (tag) {
        return res.json(filteredPost)
    } else {
        res.json(posts)
    }
}
function show(req, res) {

    const postSlug = req.params.slug
    const foundPost = posts.find((thisPost => thisPost.slug === postSlug))
    if (foundPost) {
        return res.json(foundPost)
    } else {
        return res.status(404).json({
            error: '404 not found',
            message: 'Post not found'

        })
    }
}
function store(req, res) {
    console.log(req.body);
    const newPost = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(newPost);
    console.log(posts);

    res.status(201);
    res.json(newPost);

}
function update(req, res) {
    const title = req.params.title
    const post = posts.find((post => post.title === title))
    console.log(post);

    if (!post) {

        return res.status(404).json({
            error: '404 not found',
            message: 'Post not found'
        })
    }

    post.title = req.body.title;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;
    console.log(posts)
    res.json(post);
}
function modify(req, res) {
    res.send('Modify a post with slug of ' + req.params.slug)
}
function destroy(req, res) {
    const postSlug = req.params.slug
    const index = posts.findIndex((thisPost) => thisPost.slug === postSlug);
    if (index !== -1) {
        posts.splice(index, 1);
        console.log(posts);
        res.status(204).json({
            error: '204 no content',
            message: 'No content'
        })
    }

}

module.exports = { index, show, store, update, modify, destroy }