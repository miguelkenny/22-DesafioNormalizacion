const express = require('express')
const { Server: IOServer } = require('socket.io')
const path = require('path')
const app = express()
const port = 8080
const serverExpress = app.listen(port, () => console.log(`Servidor escuchando puerto ${port}`))
const io = new IOServer(serverExpress)
const dbSqlite = require('./Container/db_Sqlite3')

const contenedorProductos = require('./Container/containerProducts')
const products = new contenedorProductos()

const contenedorMensajes = require('./Container/containerMessage')
const mensajes = new contenedorMensajes(dbSqlite, 'mensajes')

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
    console.log('New Connection!!!', socket.id);

    const prod = products.getAllTest()
    let messages = await mensajes.getMessages()

    io.emit('server:products', prod)
    io.emit('server:message', messages)

    socket.on('client:message', async messageInfo => {
        const date = new Date(Date.now()).toLocaleString().replace(',', '');
        messageInfo.date = date

        mensajes.insertMessage(messageInfo)
        let messages = await mensajes.getMessages()

        io.emit('server:message', messages)
    })
})


