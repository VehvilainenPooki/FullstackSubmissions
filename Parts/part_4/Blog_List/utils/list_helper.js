
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

module.exports = {
  dummy,
  totalLikes
}