async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error('HTTP error! Status:', response.status);
    }
    return await response.json();
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
}

async function main() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer'
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
