import { Socket, io } from "socket.io-client";

export interface IMessageService {
    joinRoom: (room: number, onMessage: NotifyFn) => void;
    sendMessage: (message: Message) => void;
}

type NotifyFn = (message: Message) => void;

export enum MessageType {
    Text,
}

export class MessageService implements IMessageService {
    socket: Socket | null = null;
    subscribers: NotifyFn[] = [];
    private static instance: MessageService | null = null;

    static getInstance(): MessageService {
        if (MessageService.instance) {
            return MessageService.instance;
        } else {
            MessageService.instance = new MessageService();
            return MessageService.instance;
        }
    }

    createJoinRoomMessage(room: number) {
        return {
            room,
        };
    }

    joinRoom(room: number, onMessage: NotifyFn) {
        const socket = io("http://localhost:8000");
        socket.connect();
        socket.emit("join-room", this.createJoinRoomMessage(room));

        socket.on("join-room-ack", (ack: JoinRoomAck) => {
            if (ack.success) {
                this.socket = socket;
                this.subscribers.push(onMessage);
            }
        });

        socket.on("room-message", (msg: Message) => {
            this.subscribers.forEach((fn) => fn(msg));
        });
    }

    sendMessage(message: Message) {
        if (this.socket) {
            this.socket.emit("message", message);
        }
    }
}
