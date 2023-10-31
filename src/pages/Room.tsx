import { useParams } from "@solidjs/router";
import { For, Show, createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { messageService, roomService } from "..";
import { CreateMessage } from "../components/CreateMessage";

const getRoom = async (id: number) => {
    const res = await roomService.getRooms({});
    if (!res.error) {
        return res.rows.find((x) => x.id == id);
    }
};

export const Room = () => {
    const params = useParams();
    const [room] = createResource<Room | undefined>(() => getRoom(parseInt(params.id)));
    const [messages, setMessages] = createStore<Message[]>([]);

    createEffect(() => {
        if (room()) {
            messageService.joinRoom(room()!.id, (msg) => {
                console.log("Message received:", msg);
                setMessages([...messages, msg]);
            });
        }
    });

    return (
        <>
            <Show when={room === undefined}>Cannot find the room specified</Show>
            <Show when={room}>
                <div>{room.name}</div>

                <div>
                    <For each={messages}>{(msg, _idx) => <div>{msg.content}</div>}</For>
                </div>

                <div>
                    <CreateMessage room={room} />
                </div>
            </Show>
        </>
    );
};
