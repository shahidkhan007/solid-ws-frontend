import { createSignal } from "solid-js";
import { CreateRoom } from "../components/CreateRoom";
import { RoomList } from "../components/RoomList";

export const Rooms = () => {
    const [createRoomCount, setCreateRoomCount] = createSignal(0);

    return (
        <div>
            <RoomList refetchTrigger={createRoomCount} />
            <CreateRoom triggerRefetch={() => setCreateRoomCount((n) => n + 1)} />
        </div>
    );
};
