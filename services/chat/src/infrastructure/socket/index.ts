import { Socket } from "socket.io";

export const setUpSocketIo = (io: any) => {

    const userSocketMap: { [key: string]: string } = {}

    io.on('connection', (socket: Socket) => {
        console.log('client connected');
        // Emit an event to the client when connected
        socket.on('setup', (user: any) => {
            userSocketMap[user?._id] = socket.id
            socket.join(socket.id)
            socket.emit('connected',)
        });
        
        socket.on('send-message', (data) => {
            console.log(userSocketMap)
            console.log(data, '-----')
            console.log("________ this is data",data);
            
            console.log("____socket id of reciecver",userSocketMap[data?.recieverId]);
            
            io.to(userSocketMap[data?.recieverId]).emit('recieve-message', data)
        })
        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
    })


    return io
}