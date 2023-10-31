import { useNavigate } from "@solidjs/router";
import { Accessor, For, Show, createResource, on } from "solid-js";
import { roomService } from "..";
import "../css/rooms.css";
import { CircularProgress } from "./common/Loader";

const RoomRow = (props: { room: Room }) => {
    const navigate = useNavigate();

    const handleJoinRoom = () => {
        navigate(`/room/${props.room.id}`);
    };

    return (
        <div style={{ display: "flex" }} class="room-row-container">
            <div class="room-row-name">{props.room.name}</div>
            <div class="room-row-btn-container">
                <button class="room-row-send-btn" onClick={handleJoinRoom}>
                    Join
                </button>
            </div>
        </div>
    );
};

export const RoomList = (props: { refetchTrigger: Accessor<number> }) => {
    const [roomsResult, { refetch }] = createResource(() => roomService.getRooms({}));

    on([props.refetchTrigger], () => {
        refetch();
    });

    return (
        <div class="rooms-container">
            <Show when={!roomsResult.loading} fallback={<CircularProgress />}>
                <For each={roomsResult()!.rows}>{(room, _idx) => <RoomRow room={room} />}</For>
            </Show>
        </div>
    );
};
