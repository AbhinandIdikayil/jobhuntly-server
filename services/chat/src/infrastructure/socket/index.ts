
export const setUpSocketIo = (io: any) => {
   console.log("______________________ we reached here");
   
    io.on('connection', (socket:any) => {
        console.log('client connected');

        // Emit an event to the client when connected
        socket.emit('connected', 'Welcome!');

        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
    })


    return io
}