async function createUser() {
  const userData = {
    name: 'Testimies',
    job: 'Software developer'
  };

  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      console.error('User failed with status code ' + response.status);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

createUser();
