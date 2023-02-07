const createBlog = document.getElementById('createBlog')

// creates new blog
createBlog.addEventListener('submit', (event) => {
  event.preventDefault()
  
  const {
    title: titleInput,
    content: contentInput
  } = event.target.elements

  const blogData = {
    title: titleInput.value,
    content: contentInput.value
  }
  
  fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blogData)
  })
  .then(response => {
    if (response.status === 200) {
      window.location.href = '/dashboard'
    }
  })
  .catch(err => console.log(err))
})