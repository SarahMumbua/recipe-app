const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      const searchResults = document.querySelector('.col-md-8');
      searchResults.innerHTML = '';
      data.meals.forEach(meal => {
        const card = `
          <div class="card mb-3">
            <img class="card-img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-body">
              <h5 class="card-title">Name: ${meal.strMeal}</h5>
              <p class="card-text">Category: ${meal.strCategory}</p>
              <a href="${meal.strSource}" class="btn btn-primary">View Recipe</a>
            </div>
          </div>
        `;
        searchResults.insertAdjacentHTML('beforeend', card);
      });
    })
    .catch(error => console.log(error));
});
