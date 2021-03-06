const express = require('express')
const { sendErrorResponse } = require('./errors')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const phoneRouter = require('./routers/phoneRouter')
const reviewRouter = require('./routers/reviewRouter')
const { connect } = require('./storage/db')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
}

const app = express()
const port = process.env.PORT || 8080

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', authRouter)
app.use('/api/users', userRouter)
app.use('/api/phones', phoneRouter)
app.use('/api/reviews', reviewRouter)

app.use(function (err, req, res, next) {
    console.error(err.stack)
    err.status = err.status || 500
    sendErrorResponse(req, res, err.status, `error: ${err.message}`, err)
})

connect(app).then(() => {
    app.listen(port, () => {
        console.log(`listening on ${port}`)
    })
})