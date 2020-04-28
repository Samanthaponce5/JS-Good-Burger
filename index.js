document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here

  getBurger()
  addBurger()
  makeBurger()
})

//====================================================
function getBurger(){
  fetch('http://localhost:3000/burgers')
  .then((resp)=>resp.json())
  .then((burgers)=>{
    burgers.forEach(function(burger){ burgerLayout(burger)})
  })
  .catch((err)=>console.log(error))
}

//----------------------------------------------------
function burgerLayout(burger){
  
let burgerMenu = document.getElementById('burger-menu')
let div = document.createElement('div')
div.className = 'burger'
div.dataset.id = burger.id 
div.innerHTML = `

  <h3 class="burger_title">${burger.name}</h3>
    <img src="${burger.image}">
    <p class="burger_description">
      ${burger.description}
    </p>
    <button class="button">Add to Order</button>

`
 burgerMenu.appendChild(div)
 //makeBurger(burger)
}
//==================================================================
function addBurger(){
  document.addEventListener('submit', function(e){
    let name = e.target.name.value
    let description = e.target.description.value
    let image = e.target.url.value
    e.preventDefault()

  fetch('http://localhost:3000/burgers',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({
      name,
      description,
      image
    })
  })
  .then((resp)=>resp.json())
  .then((burger)=>{
    burgerLayout(burger)
  })
  .catch((err)=>console.log(err))

})
}
//----------------------------------------------------------
function makeBurger(burger){
    let orderList = document.getElementById('order-list')

  document.addEventListener('click', function(e){
    if (e.target.className == 'button'){
      let list = document.createElement('li')
      let name = e.target.parentNode.children[0].innerText
      list.innerText = name 
      orderList.appendChild(list)
    }
  })
}