const API_KEY = "https://www.themealdb.com/api/json/v1/1/search.php?s=cake";
const hiddenel = document.querySelector(".hidden");
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
  <button id="detail-button" >More Detail</button>
  </div>`
  });
}

meals.addEventListener("click",(e)=>{
  
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
