// const recipeContainer = document.querySelector('.recipe');

// const timeout = function(s){
//     return new Promise(function(_, reject){
//         setTimeout(function(){
//             reject(new Error(`Request took too long! Timeout after ${s}`))
//         },s * 1000
//         );
//     }
//     );
// }
// timeout(1);


const sideBar = document.querySelector(".sidebar")
const myList = document.querySelector(".myList")
const myImg = document.querySelector(".recipe__img")
const publisher = document.querySelector(".publisher")
const recipeBox = document.querySelector(".recipe")
const showIt = document.querySelector(".hidden--toggler")

showIt.addEventListener("click", function(){
    if(sideBar.classList.contains("sidebar")){
        console.log("mmmmm")
        sideBar.classList.add("sidebar--visible--tabs")
        sideBar.classList.remove("sidebar")
    } else {
        sideBar.classList.remove("sidebar--visible--tabs")
        sideBar.classList.add("sidebar")
    }
})
const showRecipe = async function(){
    try{
        const res =
         await  fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
         const data = await res.json();
         let myData = data.data.recipe;
         console.log(myData);
         if (!res.ok) throw new Error(`${data.message} (${res.status})`)
        myList.insertAdjacentHTML('afterbegin', myData.title);
        const myRecipeFunc = function(myRecipeData){
            myImg.src = myRecipeData.image_url != "" ? myRecipeData.image_url : ""
            publisher.innerHTML = myData.publisher
        }
        myList.addEventListener("click", function(){
            myRecipeFunc(myData);
            for (let i = 0; i < myData.ingredients.length; i++ ){
                let myDescs =  `<div class="description">
                ${myData.ingredients[i].description}
                </div>`
                recipeBox.insertAdjacentHTML("beforeend", myDescs)
            }
        })
    }catch(err){
        alert(err)
    }
}
showRecipe();
