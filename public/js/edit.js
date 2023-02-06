const updateBlog = document.getElementById('updateBlog')

updateBlog.addEventListener('submit', (event) => {
  event.preventDefault()

  const {
    title: titleInput,
    content: contentInput
  } = event.target.elements

  const updatedBlog = {
    title: titleInput.value,
    content: contentInput.value
  }
 
  const blogid = event.target.dataset.blogid

  if (event.submitter.innerHTML === 'Update Post') {
    fetch(`/api/blogs/${blogid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBlog)
    })
    .then(response => {
      if (response.status === 200) {
        window.location.href = '/dashboard'
      }
    })
    .catch(err => console.log(err))
  } else if (event.submitter.innerHTML === 'Delete') {
    fetch(`/api/blogs/${blogid}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/dashboard'
      }
    })
    .catch(err => console.log(err))
  }
})