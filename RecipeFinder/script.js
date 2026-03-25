const API_KEY = "https://www.themealdb.com/api/json/v1/1/search.php?s=cake"
const hiddenel = document.getElementsByClassName("hidden")



function render(data){
    hiddenel.style.display = "block";
    data.forEach(item => {
        console.log('wasd');
        console.log(item.strMeal);
    });
}


async function getMeals  (search){
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    const data = await res.json()
    render(data.meals)
    console.log(data);
}
getMeals("cake");
