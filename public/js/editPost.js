const editPost = async (event) => {
    event.preventDefault();
  
    const editTitle = document.querySelector('#edit-title').value.trim();
    const editContent = document.querySelector('#edit-content').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
        
 
 
      console.log(editTitle, editContent, id)
      const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, post_id: id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
  };
  
  document.querySelector('.edit-post').addEventListener('click', editPost);
  
  
  