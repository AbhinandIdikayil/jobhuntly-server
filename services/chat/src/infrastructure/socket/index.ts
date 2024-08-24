import { Socket } from "socket.io";

export const setUpSocketIo = (io: any) => {
    let onlineUsers: any = [];

    io.on('connection', (socket: Socket) => {
        console.log('client connected');
        socket.on('setup', (user: any) => {
            socket.join(user?._id)
            socket.emit('connected')
            const isUserOnline = onlineUsers.some((onlineUser: any) => onlineUser.userId === user._id);
            if (!isUserOnline) {
                onlineUsers.push({ userId: user._id, socketId: socket.id, role: user?.role || 'company' });
            }

            io.emit("get-online-users", onlineUsers);
        });

        socket.on('send-message', (data) => {   //! USER WHILE SENDING MESSAGE
            io.to(data?.recieverId).emit('recieve-message', data)
        })

        socket.on('disconnect', () => {
            onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socket.id)
            io.emit("get-online-users", onlineUsers);
            console.log('client disconnected', onlineUsers);
        });
    })
    return io
}