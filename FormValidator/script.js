const emailInput = document.getElementById("email");
const esmall = document.getElementById("esmall");
const usernameInput = document.getElementById("username")
const usmall = document.getElementById("usmall")
const psmall = document.getElementById("psmall")
const passwordInput = document.getElementById("password")
const confirm = document.getElementById("confirmPassword")
const form = document.getElementById("registration-form")

let email = ""
let username = ""
let password = ""
let confirmpassword  = "" 

function check(email){
    n = email.length;
    for(i = 0;i<n;i++){
        if(email[i] === '@'){
            return true
        }
    }
    return false
}
function match(pass){
    if(pass === password){
        return true
    }else{
        return false
    }
}

function checkuserlen(user){
    if(user.length > 3){
        return true;
    }
    return false
}

emailInput.addEventListener("change",(e)=>{
    email = e.target.value
    st = check(email)
    if(!st){
        esmall.textContent = "Enter a valid emailId"
        esmall.style.visibility = "visible"
        esmall.style.color = "red"
    }
})

passwordInput.addEventListener("change",(e)=>{
    password = e.target.value

})

confirm.addEventListener("change",(e)=>{
    confirmpassword = e.target.value
    valid = match(confirmpassword) 
    if(!valid){
        psmall.textContent = "Passwords do not match"
        psmall.style.visibility = "visible"
        psmall.style.color = "red"
    }
})

usernameInput.addEventListener("change",(e)=>{
    username = e.target.value
    valid = checkuserlen(username)
    if(!valid){
        usmall.textContent = "Username should have more than 3 chars"
        usmall.style.color = "red"
        usmall.style.visibility = "visible"
    }else{
        usmall.style.visibility = "hidden"
    }
})