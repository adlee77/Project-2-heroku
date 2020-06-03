// require('dotenv').config()
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
// const stripe = Stripe(`${stripePublicKey}`) // Your Publishable Key
const stripe = Stripe('pk_test_weszHw44BI7gLmNBKkCKuXpI00mCtJCWEb') // Your Publishable Key
const elements = stripe.elements()

// Create our card inputs
var style = {
    base: {
        color: '#000'
    }
}

const card = elements.create('card', { style })
card.mount('#card-element')

console.log('CalCost: ' + localStorage.calculatedCost)
document.querySelector('#amount').value = localStorage.calculatedCost
console.log(document.querySelector('#amount').value)

const form = document.querySelector('form')

const errorEl = document.querySelector('#card-errors')

// Give our token to our form
const stripeTokenHandler = token => {
    const hiddenInput = document.createElement('input')
    hiddenInput.setAttribute('type', 'hidden')
    hiddenInput.setAttribute('name', 'stripeToken')
    hiddenInput.setAttribute('value', token.id)
    form.appendChild(hiddenInput)

    form.submit()
    console.log('did the stripe token handler actually run?')
}

// Create token from card data
form.addEventListener('submit', e => {
    console.log('line 33')
    e.preventDefault()
    console.log('did this token function actually run?')

    stripe.createToken(card).then(res => {
        if (res.error) errorEl.textContent = res.error.message
        else stripeTokenHandler(res.token)
    })
})