document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#monster-form')
  const monstrList = document.querySelector('#monster-container')
  const backButton = document.querySelector('#back')
  const frwdButton = document.querySelector('#forward')
  let monsters;//fetched from fetchData

  function fetchData() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=10')
    .then(resp => resp.json())
    .then(data => {
      monsters = data
      renderList(monsters)
    })
    .catch(err => {
      console.log('Ooops')
    })

    function renderList(monsters) {
      return monstrList.innerHTML = monsters.map(renderMonster).join('')
    }

    function renderMonster(monster) {
      return `
        <div>
          <h2>${monster.name}</h2>
          <h4>${monster.age}</h4>
          <p>${monster.description}</p>
        </div>
      `
    }
  }//fetch ends, monster list generated
  
  fetchData()

  form.addEventListener('submit', (e) => {
      e.preventDefault()
      const newName = e.target[0].value //input name
      const newAge = e.target[1].value //input age
      const newDescription = e.target[2].value //input description 
      let newMonster = {
        name: newName,
        age: newAge,
        description: newDescription
      }

      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMonster)
      })//fetch ends
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log('Ooops')})
        
      form.reset()
    })//submit ends
  
  frwdButton.addEventListener('click', e => {
    document.history.forward();
  })

})//code ends