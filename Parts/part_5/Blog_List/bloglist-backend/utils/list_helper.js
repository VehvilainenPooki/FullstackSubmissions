
const dummy = (blogs) => {
    blogs = 1
    return blogs
}

const totalLikes = (blogs) => {
    let likesSum = 0
    blogs.forEach(blog => {
        likesSum = likesSum + blog.likes
    })
    return likesSum
}

const favoriteBlog = (blogs) => {
    let likesMaxing = 0
    let maxBlog = ''
    blogs.forEach(blog => {
        if ( blog.likes > likesMaxing ) {
            likesMaxing = blog.likes
            maxBlog = blog
        }
    })
    return maxBlog
}

const mostBlogs = (blogs) => {
    //returns author with most blogs and the number of blogs as an object
    //{
    //author: 'name',
    //blogs: 634
    //}
    let blogMax = 0
    let authorMax = ''
    const authors = new Map()
    blogs.forEach(blog => {
        let blogsNumber = authors.get(blog.author)
        if (blogsNumber) {
            authors.set(blog.author, (blogsNumber + 1))
            if (blogMax < blogsNumber + 1) {
                blogMax = blogsNumber + 1
                authorMax = blog.author
            }
        } else {
            authors.set(blog.author, 1)
            if (blogMax < 1) {
                blogMax = 1
                authorMax = blog.author
            }
        }
    })
    return { author: authorMax, blogs: blogMax }

}

const mostLikes = (blogs) => {
    //returns author with most blogs and the number of blogs as an object
    //{
    //author: 'name',
    //blogs: 634
    //}
    let likesMax = 0
    let authorMax = ''
    const authors = new Map()
    blogs.forEach(blog => {
        let likesNumber = authors.get(blog.author)
        if (likesNumber) {
            authors.set(blog.author, (likesNumber + blog.likes))
            if (likesMax < likesNumber + blog.likes) {
                likesMax = likesNumber + blog.likes
                authorMax = blog.author
            }
        } else {
            authors.set(blog.author, blog.likes)
            if (likesMax < blog.likes) {
                likesMax = blog.likes
                authorMax = blog.author
            }
        }
    })
    return { author: authorMax, likes: likesMax }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}