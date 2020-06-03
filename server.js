require('dotenv').config()
var express = require('express')
var exphbs = require('express-handlebars')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

var db = require('./models')

var app = express()
var PORT = process.env.PORT || 3000

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

// stripes stuff
const bodyParser = require('body-parser')
const path = require('path')
const stripe = require('stripe')(stripeSecretKey)
// This will make our form data much more useful
app.use(bodyParser.urlencoded({ extended: true }))

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
app.use(express.static(path.join(__dirname, './views')))

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

var syncOptions = { force: false }

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    )
  })
})

module.exports = app
