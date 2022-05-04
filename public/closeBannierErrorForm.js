console.log('hello bannier error')

const buttonBannier = document.querySelector('close')
const bannier = document.querySelectorAll('alert-warning')


buttonBannier.addEventListener('click', handlerBannier)

function handlerBannier() {
    console.log('bannier cliked')
}