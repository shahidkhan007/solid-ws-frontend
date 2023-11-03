import { Resource } from "solid-js";
import { createStore } from "solid-js/store";
import { messageService } from "..";
import { MessageType } from "../services/MessageService";

export const CreateMessage = (props: { room: Resource<Room | undefined> }) => {
    const [message, setMessage] = createStore<any>({
        type: MessageType.Text,
        content: "",
        targetRoom: null,
    });

    const handleInput = (ev: any) => {
        setMessage("content", ev.target.value);
    };

    const handleSend = (ev: any) => {
        ev.preventDefault();

        if (props.room()) {
            messageService.sendMessage({
                ...message,
                targetRoom: props.room()!.id,
            });
        }
    };

    return (
        <form onSubmit={handleSend} class="flex items-center">
            <input
                type="text"
                name="content"
                onInput={handleInput}
                class="border border-blue-500 px-6 py-3 rounded-full flex-1"
                placeholder="Type your message here..."
            />
            <button
                type="submit"
                class="absolute border right-3 px-4 py-1 text-white font-bold bg-gradient-to-tr from-purple-500 to to-blue-500 rounded-full"
            >
                Send
            </button>
        </form>
    );
};
