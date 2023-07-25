// const recipeContainer = document.querySelector('.recipe');

const timeout = function(s){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error(`Request took too long! Timeout after ${s}`))
        },s * 1000
        );
    }
    );
}
timeout(1);




const desc = document.querySelector(".desc")
const myImg = document.querySelector(".recipe__imgbox")
const publisher = document.querySelector(".publisher")
const recipeBox = document.querySelector(".recipe")
const sideBar = document.querySelector(".sidebar")
const anchors = document.querySelector(".myAnchor")
const inpValue = document.querySelector(".input__search").value
const inp = document.querySelector(".input__search")
// inp.addEventListener("change" , function(){
//     inp.value = ''
// })
recipeBox.style.display = "none"
const showIt = document.querySelector(".hidden--toggler")
const recipeName = document.querySelector(".recipe--name")
const cTime = document.querySelector(".cTime")
const serv = document.querySelector(".serving")
let idList = ["5ed6604591c37cdc054bc889", "5ed6604591c37cdc054bc888", "5ed6604591c37cdc054bc887", "5ed6604591c37cdc054bc886"]


showIt.addEventListener("click", function(){
    if(sideBar.classList.contains("sidebar")){
        console.log("mmmmm")
        sideBar.classList.add("sidebar--visible--tabs")
        sideBar.classList.remove("sidebar")
    } else {
        sideBar.classList.remove("sidebar--visible--tabs")
        sideBar.classList.add("sidebar")
    }
});


const renderSpinner = function(parentEl){
  const markup =  `
  <div> <img class = "spinner" src = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"></div>`
  parentEl.innerHTML = ''
  parentEl.insertAdjacentHTML('afterbegin', markup)
}




const showRecipe = async function(){
    try{
        const id = window.location.hash.slice(1)
        console.log(id)
        if (!id) return;
        recipeBox.style.display = "block"
        const res =
         await  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
         const data = await res.json();
         let myData = data.data.recipe;
         if (!res.ok) throw new Error(`${data.message} (${res.status})`)
          
          let img = `<img src="${myData.image_url}" alt="" class="recipe__img" />`
        myImg.innerHTML = img
         recipeName.innerHTML = myData.title
         publisher.innerHTML = myData.publisher
         cTime.innerHTML = myData.cooking_time + " : 00 m - only"
         serv.innerHTML = myData.servings + " units" 
         desc.innerHTML = myData.ingredients.map(ing=> {
             return `${ing.quantity + " " + ing.unit +  " " +  ing.description}` 
            }).join(`, <br>`)
            
        }catch(err){
            alert(err)
        }
        
    }
    //  showRecipe();
    window.addEventListener('load', showRecipe)
    window.addEventListener('hashchange', showRecipe)
    // let anc = `<a class="myAnchor" href="#5ed6604591c37cdc054bcb37">recipe1</a>`
    // sideBar.insertAdjacentHTML('afterbegin', anc)
    



const loadSearchResults = async function(query){
    try{
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
        const data = await res.json()
        const myData = data.data.recipes
        console.log(myData)
        for (let i = 0; i < myData.length; i++ ){
            const myHtml = `<a class = "myAnchor" href= "#${myData[i].id}">${myData[i].title}</a>`
           myData.length != 0 ?  sideBar.insertAdjacentHTML("afterbegin", myHtml) : sideBar.innerHTML = "no data found"
        }
    } catch(err){
        console.log(err)
    }
}
loadSearchResults('pizza')
// document.querySelector(".input__btn").addEventListener("click",
// function(){
//     loadSearchResults(`${inpValue}`);
// }
// )



