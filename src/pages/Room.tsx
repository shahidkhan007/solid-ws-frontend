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
    const [room] = createResource<Room | undefined>(() =>
        getRoom(parseInt(params.id))
    );
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
            <Show when={room === undefined}>
                Cannot find the room specified
            </Show>
            <Show when={room}>
                <div class="flex flex-col lg:flex-row h-screen">
                    <div class="sticky top-0 lg:w-1/4 bg-gradient-to-tr from-purple-500 to-blue-500 text-white p-5 flex">
                        <div class="flex-1">
                            <h1 class="text-3xl capitalize">room name</h1>
                        </div>
                    </div>

                    <div class="flex-1 p-5 flex flex-col bg-gradient-to-tr from-purple-100 to-blue-100">
                        <div class="flex-1 bg-opacity-70 bg-white rounded-2xl mb-5 overflow-y-auto p-5">
                            <For each={messages}>
                                {(msg, _idx) => (
                                    <div class="border border-purple-500 px-6 py-2 mb-4 rounded-full w-max text-purple-500 shadow-lg">
                                        {msg.content}
                                    </div>
                                )}
                            </For>
                        </div>

                        <div class="sticky bottom-5">
                            <CreateMessage room={room} />
                        </div>
                    </div>
                </div>
            </Show>
        </>
    );
};
