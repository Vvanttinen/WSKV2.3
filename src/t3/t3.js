async function main() {
  const userData = {
    name: 'Testimies',
    job: 'Software Engineer'
  };

  // GET request
  try {
    const response = await fetch('https://reqres.in/api/unknown/23')
    console.log(response);
  }
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

  // POST request
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    });
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

  // PUT request
  try {
    const response = await fetch('https://reqres.in/api/users/null', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

  // DELETE request
  try {
    const response = await fetch('https://reqres.in/api/users/all', {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log('User deleted successfully');
    } else {
      console.error('Failed to delete user with status code ' + response.status);
    }
  }
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

main();
