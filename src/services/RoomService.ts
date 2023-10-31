import axios from "axios";
import { API } from "../constants";

export interface IRoomService {
    getRooms: (opts: GetRoomOpts) => Promise<GetResult<Room, GetRoomError>>;
    createRoom: (data: CreateRoom) => Promise<CreateResult<Room, CreateRoomErr>>;
}

export class RoomService implements IRoomService {
    private static instance: RoomService | null = null;

    static getInstance(): RoomService {
        if (RoomService.instance) {
            return RoomService.instance;
        } else {
            RoomService.instance = new RoomService();
            return RoomService.instance;
        }
    }

    getRooms = async (_opts: GetRoomOpts): Promise<GetResult<Room, GetRoomError>> => {
        try {
            const response = await axios.get(API + "/room", { withCredentials: true });
            return {
                rows: response.data.rows,
                count: response.data.count,
                error: null,
            };
        } catch (err: any) {
            return {
                rows: [],
                count: 0,
                error: err?.response?.data?.message || "Something went wrong",
            };
        }
    };

    createRoom = async (data: CreateRoom): Promise<CreateResult<Room, CreateRoomErr>> => {
        try {
            const response = await axios.post(API + "/room", data, { withCredentials: true });
            return {
                entity: response.data.entity,
                error: null,
                message: response.data.message,
            };
        } catch (err: any) {
            return {
                message: err?.response?.data?.message || "Something went wrong.",
                entity: null,
                error: err?.response?.data?.message || "Something went wrong.",
            };
        }
    };
}
