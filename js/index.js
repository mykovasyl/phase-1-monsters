document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#monster-form')
  const monstrList = document.querySelector('#monster-container')
  const backButton = document.querySelector('#back')
  const frwdButton = document.querySelector('#forward')
  let monsters;//fetched from fetchData
  let page = 1;

  function fetchData(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(resp => resp.json())
      .then(data => {
        monsters = data
        renderList(monsters)
      })
      .catch(err => {
        console.log('Ooops')
      })
  }//fetch ends, monster list generated

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

  fetchData(page)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target[0].value //input name
    const age = e.target[1].value //input age
    const description = e.target[2].value //input description 
    let newMonster = { name, age, description }

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMonster)
    })//fetch ends
      .then(resp => resp.json())
      .then(data => {
        monsters.unshift(data)
        renderList(monsters)
      })
      .catch(err => {
        console.log(`Ooops: ${err}`)
      })

    form.reset()
  })//submit ends

  frwdButton.addEventListener('click', e => {
    page++
    fetchData(page)
  })

  backButton.addEventListener('click', e => {
    if(page > 1) {
    page--
    fetchData(page)
    }
  })

})//code ends