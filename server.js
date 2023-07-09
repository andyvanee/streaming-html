import http from 'node:http'
import { home } from './handlers/home.js'
import { assets } from './handlers/assets.js'

const PORT = process.env.PORT || 3000

const server = http.createServer(async (req, res) => {
    if (await assets(req, res)) return
    home(req, res)
})

server.listen(PORT, () => {
    console.log('Server listening', { PORT })
})
