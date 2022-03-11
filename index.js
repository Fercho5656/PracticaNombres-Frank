const $ = e => document.querySelector(e)
const $$ = e => document.querySelectorAll(e)

const quantity = $('#quantity')
const sendQuantityBtn = $('#sendQuantityBtn')
const form = $('#form')
const namesSection = $('#names')

const names = []

const sendFormBtn = document.createElement('button')
sendFormBtn.textContent = 'Enviar Nombres'
sendFormBtn.className = 'btn btn-primary'

// Takes every name and do the thing
form.addEventListener('submit', e => {
  e.preventDefault()
  removeElements($$('#names *'))
  names.length = 0
  $$('input[name*=name]').forEach(input => names.push(input.value))

  // Shows random name
  namesSection.appendChild(createHeader('Nombre Aleatorio'))
  namesSection.appendChild(createRandomName(names))

  // Shows sorted names
  namesSection.appendChild(createHeader('Nombres Ordenados Ascendentemente'))
  const sortedNames = names.sort()
  namesSection.appendChild(createList(sortedNames))

  // Shows reversed sorted names
  namesSection.appendChild(createHeader('Nombres Ordenados Descendentemente'))
  const reversedSortedNames = names.sort().reverse()
  namesSection.appendChild(createList(reversedSortedNames))

  // Shows two random names
  namesSection.appendChild(createHeader('Dos nombres aleatorios'))
  for (let i = 0; i <= 1; i++) {
    namesSection.appendChild(createRandomName(names))
  }
})

// Adds name fields
sendQuantityBtn.addEventListener('click', () => {
  removeElements($$('#form > input[name*=name]'))
  for (let i = 0; i < quantity.value; i++) {
    createNameFields(i)
  }
  form.appendChild(sendFormBtn)
})

const createNameFields = idx => {
  const name = document.createElement('input')
  name.setAttribute('type', 'text')
  name.setAttribute('name', `name${idx}`)
  name.setAttribute('placeholder', `Nombre - ${idx + 1}`)
  name.setAttribute('required', true)
  name.className = 'input'
  form.appendChild(name)
}

const removeElements = elements => elements.forEach(e => e.remove())

const createRandomName = names => {
  const randomName = names[Math.floor(Math.random() * names.length)]
  const randomNameField = document.createElement('p')
  randomNameField.textContent = randomName
  return randomNameField
}

const createList = () => {
  const list = document.createElement('ol')
  names.forEach(name => {
    const listItem = document.createElement('li')
    listItem.textContent = name
    list.appendChild(listItem)
  })
  return list
}

const createHeader = title => {
  const header = document.createElement('h2')
  header.textContent = title
  return header
}

const checkMaxLength = obj => {
  obj.value = Math.min(Math.max(obj.value, obj.min), obj.max)
}
