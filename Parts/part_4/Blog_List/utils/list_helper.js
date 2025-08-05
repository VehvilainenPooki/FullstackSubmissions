
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    likesSum = 0
    blogs.forEach(blog => {
        likesSum = likesSum + blog.likes
    })
    return likesSum
}

const favoriteBlog = (blogs) => {
    likesMaxing = 0
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
    blogMax = 0
    authorMax = ''
    authors = new Map()
    blogs.forEach(blog => {
        blogsNumber = authors.get(blog.author)
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
    return { author: authorMax, blogs: blogMax}

}

const mostLikes = (blogs) => {
    //returns author with most blogs and the number of blogs as an object
    //{
    //author: 'name',
    //blogs: 634
    //}
    likesMax = 0
    authorMax = ''
    authors = new Map()
    blogs.forEach(blog => {
        likesNumber = authors.get(blog.author)
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
    return {author: maxBlog.author, likes: likesMax}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}