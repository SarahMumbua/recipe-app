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
          const instructionsList = meal.strInstructions.split('.').map(instruction => instruction.trim()).filter(instruction => instruction).map((instruction, index) => `${index + 1}. ${instruction}`).join('<br>');
          const card = `
            <div class="card mb-3">
              <img class="card-img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="card-body">
                <h5 class="card-title">Name:${meal.strMeal}</h5>
                <p class="card-text">Category: ${meal.strCategory}</p>
                <a href="#" class="btn btn-primary view-recipe" data-instructions="${instructionsList}">View Recipe</a>
                <button class="btn btn-secondary vote-btn">Vote</button>
                <span class="votes">0</span>
              </div>
            </div>
          `;
          searchResults.insertAdjacentHTML('beforeend', card);
        });

        const viewRecipeLinks = document.querySelectorAll('.view-recipe');
        viewRecipeLinks.forEach(link => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const instructions = link.dataset.instructions;
            const cardBody = link.parentElement;
            const instructionsElement = document.createElement('div');
            instructionsElement.classList.add('card-text', 'instructions');
            instructionsElement.innerHTML = `
              <h2>Instructions</h2>
              <hr>
              <p>${instructions}</p>
            `;
            cardBody.appendChild(instructionsElement);
          });
          link.addEventListener('mouseover', () => {
            link.style.backgroundColor = 'red';
          });
          link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '';
          });
        });

        const voteButtons = document.querySelectorAll('.vote-btn');
        voteButtons.forEach(button => {
          button.addEventListener('click', () => {
            const votesElement = button.parentElement.querySelector('.votes');
            let votes = parseInt(votesElement.textContent);
            votes++;
            votesElement.textContent = votes.toString();
          });
        });
      }
    })
    .catch(error => console.log(error));
});
