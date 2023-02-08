const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

const hbs = exphbs.create({helpers})

const sess = {
  secret: "super secret secret",
  cookie: {
    maxAge: 900000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})