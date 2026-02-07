const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click",()=>{


    update();
})


paletteContainer.addEventListener("click",()=>{
    
})

function generatePalette(){
    let colors = []
    for(let i=0;i<5;i++){
        colors[i] = generateColor();
        console.log(colors[i]);
    }
    return colors
}

function generateColor(){
    const letters = "0123456789ABCDEF"
    let color = "#"
    for(let i =0 ;i<6;i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function update(){
    
    const colorBox = document.querySelectorAll(".color-box");
    console.log(colorBox);
    colorBox.forEach((box ,index) => {
        let colors = generatePalette();
        let color = colors[index];
        let plate = box.querySelector(".color")
        let value = box.querySelector(".hex-value") 
        plate.style.backgroundColor  = color;
        value.textContent = colors[index]
    });


}