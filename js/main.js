const foods = document.getElementById('foods');
document.getElementById('search').addEventListener('keyup',event =>{
   const query = event.target.value;
    if(query.length == 0){
      foods.textContent = '';
    }   
    else{
      searchFood(query);
    }
   
})





 function searchFood(query){
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
   .then(res => res.json())
   .then(result => showResult(result.meals) );
    
}

function showResult(result){
    foods.textContent = '';
    if(result != null){
        result.forEach(food => {
            populateHtml(food);
        });
        
    }
    else{
       foods.innerHTML='<h1 class="text-center">No result found</h1>'
    }
}

function populateHtml(food){

    const tags = food.strTags == null ? '<br>': food.strTags;
    const html = `
    <div class="card shadow-sm">
    <img src="${food.strMealThumb}" alt="${food.strMeal}" class="img-thumbnail">

      <div class="card-body">
      <h5>${food.strMeal} </h5>
      <small class="text-primary"> ${tags} </small>
        <hr>
        <div class="d-flex  justify-content-between align-items-center">
          <div class="btn-group">
          <button onClick="showDetails(${food.idMeal})" type="button" class="btn btn-primary"  >
            View Details
        </button>
          </div>
          <small class="text-muted">${food.strArea}, ${food.strCategory}</small>
        </div>
      </div>
    </div>
    `;

    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = html;
    foods.appendChild(div);
}








 function showDetails(meal){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
   .then(res => res.json())
   .then(result => openModal(result.meals[0]));

 }

 function openModal(details){
    
    document.getElementById('foodDetailsModalTitle').innerText= details.strMeal;
    let html = `
   
    <img src="${details.strMealThumb}" alt="${details.strMeal}"  class="mb-3" height="300px" width="100%" style="object-fit: cover;">
    
    <p>
    ${details.strInstructions}
    </P>
    <a href="${details.strYoutube}" class="btn btn-danger">
        Watch Youtube
    </a>
    <h3>
    <hr>
    Ingredients
    </h3>
    <hr>
<ul style="list-style:none" id="ingredients">
        <li>${details.strIngredient1}  ${details.strMeasure1}</li>
        <li>${details.strIngredient2}  ${details.strMeasure2}</li>
        <li>${details.strIngredient3}  ${details.strMeasure3}</li>
        <li>${details.strIngredient4}  ${details.strMeasure4}</li>
        <li>${details.strIngredient5}  ${details.strMeasure5}</li>
        <li>${details.strIngredient6}  ${details.strMeasure6}</li>
        <li>${details.strIngredient7}  ${details.strMeasure7}</li>
        <li>${details.strIngredient8}  ${details.strMeasure8}</li>
        <li>${details.strIngredient9}  ${details.strMeasure9}</li>
        <li>${details.strIngredient10}  ${details.strMeasure10}</li>
        <li>${details.strIngredient11}  ${details.strMeasure11}</li>
        <li>${details.strIngredient12}  ${details.strMeasure12}</li>
        <li>${details.strIngredient13}  ${details.strMeasure13}</li>
        <li>${details.strIngredient14}  ${details.strMeasure14}</li>
        <li>${details.strIngredient15}  ${details.strMeasure15}</li>
        <li>${details.strIngredient16}  ${details.strMeasure16}</li>
        <li>${details.strIngredient17}  ${details.strMeasure17}</li>
        <li>${details.strIngredient18}  ${details.strMeasure18}</li>
        <li>${details.strIngredient19}  ${details.strMeasure19}</li>
        <li>${details.strIngredient20}  ${details.strMeasure20}</li>
</ul>
    `
    document.getElementById('modal-body').innerHTML=html;

    
    var myModal = new bootstrap.Modal(document.getElementById('foodDetailsModal'));
    
    myModal.show();
 }

 

