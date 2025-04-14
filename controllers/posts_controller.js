const connection = require('../data/db')
/* const posts = require('../data/posts')
 */
function index(req, res) {
    const sql = 'SELECT * FROM posts'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        console.log(results);
        res.json(results)

    })

}
function show(req, res) {

    const postId = Number(req.params.id)

    const sql = `SELECT * FROM posts WHERE id = ?`

    connection.query(sql, [postId], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        if (results.length === 0) return res.status(404).json({
            message: 'There is nothing to show'
        })
        const post = results[0]

        res.json(post)

    })


    /* const postSlug = req.params.slug
    const foundPost = posts.find((thisPost => thisPost.slug === postSlug))
    if (foundPost) {
        return res.json(foundPost)
    } else {
        return res.status(404).json({
            error: '404 not found',
            message: 'Post not found'

        })
    } */
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
    const postId = Number(req.params.id)

    const sql = `DELETE FROM posts WHERE id = ?`

    connection.query(sql, [postId], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        if (results.affectedRows === 0) return res.status(404).json({
            message: 'There is nothing to delete'
        })
        res.sendStatus(204)
    })



}

module.exports = { index, show, store, update, modify, destroy }