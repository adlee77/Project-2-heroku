var db = require('../models')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)


module.exports = function(app) {
    // Load index page
    app.get('/', function(req, res) {
        db.Products.findAll({}).then(function(dbExamples) {
            res.render('home', {
                msg: 'Welcome!',
                examples: dbExamples
            })
        })
    })

    // Cart Page
    app.get('/cart', function(req, res) {
        res.render('cart')
    })

    // Purchase Success Page
    app.get('/success', function(req, res) {
        res.render('Purchase-Success')
    })

    app.get('/shop', function(req, res) {
        db.Products.findAll({}).then((data) => {
            res.render('shop', { Products: data })
            console.log(data)
        })
    })

    app.get('/purchase', function(req, res) {
        res.render('purchase')
    })

    app.post('/charge', (req, res) => {
        console.log(req.body.amount)
        try {
            stripe.customers
                .create({
                    name: req.body.name,
                    email: req.body.email,
                    source: req.body.stripeToken
                })
                .then(customer =>
                    stripe.charges.create({
                        amount: parseInt(req.body.amount) * 100,
                        currency: 'usd',
                        customer: customer.id
                    })
                
                ).then(() => res.render('Purchase-Success'))
                .catch(err => console.log(err))
        } catch (err) {
            res.send(err)
        }
    })

    app.post('/cart', function(req, res) {
        console.log(req.body)
            // res.render to cart page
        res.render('cart', req.body)
    })
}