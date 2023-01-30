

const deletePost = async () => {
  
  const id = document.querySelector('#delete-post').value
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id
      }),
      // headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#delete-post').addEventListener('click', deletePost);
  