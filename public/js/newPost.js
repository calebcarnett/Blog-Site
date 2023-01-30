const newpost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  
  if (title && content) {
    console.log(title, content)
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, content}),
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
  }
};

document.querySelector('#create').addEventListener('click', newpost);





