
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}