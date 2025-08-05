
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


module.exports = {
  dummy,
    totalLikes,
    favoriteBlog,
}