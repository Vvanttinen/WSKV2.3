async function init() {
  try {
    await fetchData("https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants")
  }
  catch (error) {
    console.error('Error during initialization:', error);
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const restaurants = await response.json();
    main(restaurants);
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
}

async function fetchDailyMenu(id, lang = "en") {
  try {
    const response = await fetch(`https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/${lang}`);
    if (!response.ok) {
      throw new Error(`No menu available for this restaurant.`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Menu fetch failed: ${error.message}`);
    return null; // Return null if the menu fetch fails
  }
}

async function main(restaurants) {
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  const table = document.querySelector('table');
  const dialog = document.querySelector('dialog');

  restaurants.forEach((restaurant) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${restaurant.name}</td>
      <td>${restaurant.address}</td>
    `;

    row.addEventListener('click', async (event) => {
      if (!dialog.open) {
        event.stopPropagation();
      }
      const allRows = table.querySelectorAll('tr');
      allRows.forEach(r => r.classList.remove('highlight'));
      row.classList.add('highlight');

      const menuData = await fetchDailyMenu(restaurant._id);
      let menuHTML = "<p>No menu available</p>";

      if (menuData && menuData.courses.length > 0) {
        menuHTML = `<ul>${menuData.courses.map((course) => `<li>${course.name} - ${course.price}</li>`).join("")}</ul>`;
      }

      dialog.innerHTML = `
      <h2>${restaurant.name}</h2>`
        + `<p>${restaurant.address}</p>`
        + `<p>${restaurant.postalCode} ${restaurant.city}</p>`
        + `<p>${restaurant.phone}</p>`
        + `<p>${restaurant.company}</p>`
        + `<h3>Daily menu</h3>`
        + `${menuHTML}`;

      dialog.showModal();
    });

    table.appendChild(row);
  })

  document.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
    }
  });
}

init();
