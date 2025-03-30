async function fetchUserData() {
  try {
    const response = await fetch('https://reqres.in/api/users/1');
    if (!response.ok) {
      console.error('User failed with status code ' + response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

fetchUserData();
