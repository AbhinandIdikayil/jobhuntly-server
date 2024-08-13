import { Socket } from "socket.io";

export const setUpSocketIo = (io: any) => {
   console.log("______________________ we reached here");
   
    io.on('connection', (socket:Socket) => {
        console.log('client connected');

        // Emit an event to the client when connected
        socket.on('setup',(user:any) => {
            socket.join(user?._id)
            socket.emit('connected',)
        });

        socket.on('send-message',(data) => {
            console.log(data)
        })
        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
    })


    return io
}