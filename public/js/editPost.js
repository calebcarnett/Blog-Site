const editPost = async (event) => {
    event.preventDefault();
  
    const editTitle = document.querySelector('#edit-title').value.trim();
    const editContent = document.querySelector('#edit-content').value.trim();
    const postId = document.querySelector('#edit-post').value;

 
 
      console.log(editTitle, editContent, postId)
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content}),
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
  };
  
  document.querySelector('#edit-post').addEventListener('click', editPost);
  
  
  