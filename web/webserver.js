import express from 'express'
import path from 'path'

const app = express()
const router = express.Router()

app.use(express.static('public'))

app.use('/', router)

router.use('/', (req,res) => {
    res.sendFile(path.resolve('public','index.html'))
})

const port = 8080

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})