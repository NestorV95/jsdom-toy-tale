let addToy = false;

const url = 'http://localhost:3000/toys'

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

  fetchAndysToys()
  addANewToy()
  // increaseToysLikes()
});

function fetchAndysToys(){
  const collection = document.querySelector("#toy-collection")

  //When page loads make GET request to fetch all toy objects.
  fetch(url)
    .then(resp => resp.json() ) 
    .then(toyData => {

      //With response data make a <div class="card"> for each toy 
      toyData.forEach(toy => {

        const card = document.createElement('div')
        card.className = 'card'
          //Each card should have the following child elements:
          //h2 tag with the toy's name

          const name = document.createElement('h2')
          name.innerText = toy.name

          //img tag with the src of the toy's image attribute and the class name "toy-avatar"
          const image = document.createElement('img')
          image.className = 'toy-avatar'
          image.src = toy.image

          //p tag with how many likes that toy has
          const likes = document.createElement('p')
          likes.innerText = `${toy.likes} Likes`

          //button tag with a class "like-btn"
          const button = document.createElement('button')
          button.className = 'like-btn'
          button.innerText = 'Like <3'

            button.addEventListener('click', (e) => {
              e.preventDefault()
              configObj = {
                method: 'PATCH',
                headers: {
                  'Content-Type':'application/json',
                  'accept':'application/json'
                },
                body: JSON.stringify({
                  likes: (toy.likes += 1)
                })
              }

              fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
              .then(resp => resp.json())
              .then(toy => { 
                likes.innerText = ''
                likes.innerHTML = `${toy.likes} Likes`
              })
            })
       
        card.append(name, image, likes, button)

        //Add  each card to <div id="toy-collection">
        collection.appendChild(card)

      })
       
    })
        
}

function addANewToy(){
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const collection = document.querySelector("#toy-collection")
    const newName = toyForm[0].value
    const newImage = toyForm[1].value
    newToy = {
      name: newName,
      image: newImage,
      likes: 0
    }
    configObj = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(newToy)
    }
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(toy => {
      const card = document.createElement('div')
      card.className = 'card'         
      const name = document.createElement('h2')
      name.innerText = toy.name
      const image = document.createElement('img')
      image.className = 'toy-avatar'
      image.src = toy.image
      const likes = document.createElement('p')
      likes.innerText = `${toy.likes} Likes`
      const button = document.createElement('button')
      button.className = 'like-btn'
      button.innerText = 'Like <3'
      card.append(name, image, likes, button)
      collection.append(card)
    })
  })
}

