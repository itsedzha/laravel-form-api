// Function to fetch and display posts
function fetchPosts() {
    const token = document.getElementById('user-token').value; // Use the token from the user input
  
    fetch('http://127.0.0.1:8000/api/posts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const postsList = document.getElementById('posts-list');
      postsList.innerHTML = ''; // Clear previous posts
      data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <button class="delete-post-btn" data-id="${post.id}">Delete</button>
          <hr>
        `;
        postsList.appendChild(postElement);
      });
  
      // Add event listeners for delete buttons
      document.querySelectorAll('.delete-post-btn').forEach(button => {
        button.addEventListener('click', function() {
          const postId = this.getAttribute('data-id');
          deletePost(postId); // Call delete post function
        });
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }
  
  // Function to delete a post
  function deletePost(postId) {
    const token = document.getElementById('user-token').value;
  
    fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Post deleted successfully!');
        fetchPosts(); // Refresh posts list after deletion
      } else {
        alert('Failed to delete the post.');
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  }
  
  // Get User logic
  document.getElementById('get-user-btn').addEventListener('click', function () {
    const token = document.getElementById('user-token').value;
  
    fetch('http://127.0.0.1:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('user-info').innerText = `User: ${data.name}, Email: ${data.email}`;
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });
  });
  
  // Create Post logic
  document.getElementById('create-post-btn').addEventListener('click', function () {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const token = document.getElementById('user-token').value;
  
    fetch('http://127.0.0.1:8000/api/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: body
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Post created:', data);
      alert('Post created successfully!');
      fetchPosts(); // Fetch posts after creating a new post
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
  });
  
  // Show All Posts button logic
  document.getElementById('show-posts-btn').addEventListener('click', function () {
    fetchPosts(); // Fetch and display posts when "Show All Posts" is clicked
  });
  