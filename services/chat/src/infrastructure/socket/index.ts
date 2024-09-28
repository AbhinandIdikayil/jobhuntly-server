import { Socket } from "socket.io";
import { updateMessageStatus } from "../database/mongodb/repositories/updateMessageStatus";

export const setUpSocketIo = (io: any) => {
    let onlineUsers: any = [];

    io.on('connection', (socket: Socket) => {
        console.log('client connected');
        socket.on('setup', (user: any) => {
            if (user?._id) {
                socket.join(user?._id)
                socket.emit('connected')
                const isUserOnline = onlineUsers.some((onlineUser: any) => onlineUser.userId === user._id);
                if (!isUserOnline) {
                    onlineUsers.push({ userId: user._id, socketId: socket.id, role: user?.role || 'company' });
                }
                console.log('online users --- ---- ', onlineUsers)
                io.emit("get-online-users", onlineUsers);
            }
        });


        //! READ AND UNREAD
        socket.on('mark-as-read', async (data) => {
            console.log(data, 'marking it as read-------------')
            io.to(data?.senderId).emit('message-read', { messageId: data?.messageId, status: 'read' })
            await updateMessageStatus({ id: data?.messageId, status: 'read' })
        })

        socket.on('send-message', (data) => {   //! USER WHILE SENDING MESSAGE
            console.log('send message----------', data)
            io.to(data?.recieverId).emit('recieve-message', data)
        })

        socket.on('interviewer', (data) => {
            console.log('Interview start-------', data);
            io.to(data?.to).emit('interviewee', data)
        })

        socket.on('disconnect', () => {
            onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socket.id)
            io.emit("get-online-users", onlineUsers);
            console.log('client disconnected', onlineUsers);
        });
    })
    return io
}