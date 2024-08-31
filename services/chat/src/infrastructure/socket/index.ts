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

        socket.on('call', (data) => {
            const { receiverId, offer } = data;
            const receiverSocketId = onlineUsers[receiverId];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('incoming-call', { offer, from: socket.id });
            }
        });

        socket.on('answer-call', (data) => {
            const { to, answer } = data;
            io.to(to).emit('call-answered', { answer });
        });

        socket.on('ice-candidate', (candidate) => {
            io.emit('ice-candidate', candidate);
        });

        socket.on('end-call', (data) => {
            const { callId } = data;
            io.emit('call-ended', { callId });
        });


        //! READ AND UNREAD
        socket.on('select_user',(data) => {
            
        })

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