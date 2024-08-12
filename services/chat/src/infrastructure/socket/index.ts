import { Server as SocketIoServer } from 'socket.io'
import { CLIENT_URL } from '../../config/env'

export const setUpSocketIo = (server: any) => {
    const io = new SocketIoServer(server,{
        cors:{
            origin:CLIENT_URL
        }
    })

    io.on('connection',(socket) => {
        console.log('client connected')

        socket.on('disconnected',() => {
            console.log('client disconnected')
        })
    })


    return io
}