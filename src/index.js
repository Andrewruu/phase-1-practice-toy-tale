let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
getAllToys()
document.querySelector('.add-toy-form').addEventListener('submit',handleSubmit)
});

function renderToy(toy){
  const div = document.createElement('div')
  const toyContainer = document.querySelector('#toy-collection')
  div.className = "card"

  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}" onClick="updateLikes(${toy.id})">Like ❤️</button>
  `
  div.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes+= 1
    div.querySelector('p').textContent = `${toy.likes} Likes`
    updateLikes(toy)
  })


  toyContainer.appendChild(div)
}

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body:JSON.stringify(toyObj)
  })
}

function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  renderToy(toyObj)
  addNewToy(toyObj)
}
function addNewToy(toyObj){
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body:JSON.stringify(toyObj)
  })
}

function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => toyData.forEach(toy => renderToy(toy)))
}