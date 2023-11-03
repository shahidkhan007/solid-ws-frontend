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
        <div class="flex justify-between px-4 py-3 border rounded-xl mb-3 items-center">
            <div class="  capitalize">{props.room.name}</div>
            <div class=" ">
                <button
                    class="border border-blue-500 h-full  px-6 py-1 rounded-lg text-blue-800"
                    onClick={handleJoinRoom}
                >
                    Join
                </button>
            </div>
        </div>
    );
};

export const RoomList = (props: { refetchTrigger: Accessor<number> }) => {
    const [roomsResult, { refetch }] = createResource(() =>
        roomService.getRooms({})
    );

    on([props.refetchTrigger], () => {
        refetch();
    });

    return (
        <div class="container mx-auto border max-w-md rounded-3xl p-3 mt-5 border-blue-500">
            <Show when={!roomsResult.loading} fallback={<CircularProgress />}>
                <For each={roomsResult()!.rows}>
                    {(room, _idx) => <RoomRow room={room} />}
                </For>
            </Show>
        </div>
    );
};
