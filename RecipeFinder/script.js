const API_KEY = "https://www.themealdb.com/api/json/v1/1/search.php?s=cake";
const hiddenel = document.querySelectorAll(".hidden");
const inputbox = document.getElementById("search-input");
const backbtn = document.getElementById("search-btn");
const meals = document.getElementById("meals");
const  mealdetails = document.getElementsByClassName("meal-details-content")
const detailBtn = document.getElementById("detail-button")

function render(data) {
  meals.innerHTML = data.map((item) => {
    return `<div class="meal-container">
  <div class="image-container">
    <img src=${item.strMealThumb} alt="">
  </div>
  <h3>${item.strMeal}</h3>
  <button class="detail-button" data-id=${item.idMeal} >More Detail</button>
  </div>`
  }).join("");
}

meals.addEventListener("click",(e)=>{
  const button = e.target.closest(".detail-button")
  if(!button) return 
  const mealId = button.dataset.id
  console.log('btn clicked');
  console.log(mealId);
  showDetail(mealId)
})

async function getMeals(search) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
  );
  if (res === null || res === undefined) {
    hiddenel.style.display = "block";
    return;
  }
  const data = await res.json();

  render(data.meals);
  console.log(data);
}
console.log(inputbox.value);
backbtn.addEventListener("click", (e) => {
  console.log("clicked");
  let search = inputbox.value;
  getMeals(search);
});

async function showDetail(mealId) {
  mealId = Number(mealId)
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  const data = await res.json()
  const obj = data.meals[0]
  hiddenel[1].style.display = "block"
  hiddenel[1].innerHTML = `
    <div class="detail-container">
      <h2>Recipe-> ${obj.strMeal}</h2>
      <div class="detai-text">
        <p>Category-> ${obj.strCategory}</p>
        <p>Instruction-> ${obj.strInstructions}</p>
      </div>
  
      <div class="detail-img">
        <img src=${obj.strMealThumb} alt="">
        </div>
    </div>
  `
}