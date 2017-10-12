const metamask = require('metamascara')
const EthJs = require('ethjs')

window.addEventListener('load', startup)

let account
function startup () {
  const ethereumProvider = metamask.createDefaultProvider()
  const eth = new EthJs(ethereumProvider)
  console.log(eth)
  button('Check currentProvider', () => response(eth.currentProvider.isConnected()))
  button('Check account', async () => await eth.accounts((err, res) => {
    account = res
    if (err) return showError(err)
    response(res)
  }))
  button('Check sendTransaction', async () => await eth.sendTransaction({from: account[0], to: account[0], value: '0', data: '0x'}, handleResult))
}


function button (id, cb) {
  const main = document.getElementById('main')
  const button = document.createElement('BUTTON')
  const linebreak = document.createElement('br')
  button.id = id
  button.innerText = id
  button.addEventListener('click', cb)
  main.appendChild(button)
}

function response (res) {
  const response = document.getElementById('res')
  const listItem = document.createElement('li')
  listItem.innerText = res
  response.appendChild(listItem)
}

function handleResult (err, result)  {
  if (err) return showError(err)
  response(result)
}


function showError (message) {
  var errContainer = document.getElementById('err')
  errContainer.style.background = ' #ffd6cc'
  errContainer.style.color = '#ff471a'
  errContainer.innerText = message
}