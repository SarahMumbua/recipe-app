const searchButton = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => {
      const searchResults = document.querySelector('.col-md-8');
      if (searchResults) {
        searchResults.innerHTML = '';
        data.meals.forEach(meal => {
          const instructionsList = meal.strInstructions.split('\n').map(instruction => `<li>${instruction.trim()}</li>`).join('');
          const card = `
            <div class="card mb-3">
              <img class="card-img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="card-body">
                <h5 class="card-title">Name:${meal.strMeal}</h5>
                <p class="card-text">Category: ${meal.strCategory}</p>
                <a href="#" class="btn btn-primary view-recipe" data-instructions="${instructionsList}">View Recipe</a>
            
              </div>
            </div>
          `;
          searchResults.insertAdjacentHTML('beforeend', card);
        });

        const viewRecipeLinks = document.querySelectorAll('.view-recipe');
        viewRecipeLinks.forEach(link => {
          link.addEventListener('click', () => {
            const instructions = link.dataset.instructions;
            alert(instructions);
          });
        });
      }
    })
    .catch(error => console.log(error));
});
