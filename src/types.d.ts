type Result<T, Err> = {
    value: T | null;
    error: Err | null;
};

type Option<T> = T | null;

type GetResult<T, E> = {
    rows: T[];
    count: number;
    error: E | null;
};

type CreateResult<E, Err> = {
    entity: E | null;
    error: Err | null;
    message: string;
};

type Room = {
    id: number;
    name: string;
};

type GetRoomOpts = {};

type GetRoomError = string;

type CreateRoom = {
    name: string;
};

type CreateRoomErr = {
    errorList: string[];
};

type Message = {
    type: MessageType;
    content: any;
    targetRoom: number;
};

type JoinRoomMessage = {
    room: number;
};

type JoinRoomAck = {
    success: boolean;
};
