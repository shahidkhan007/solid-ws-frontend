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
            messageService.sendMessage({ ...message, targetRoom: props.room()!.id });
        }
    };

    return (
        <form onSubmit={handleSend}>
            <input type="text" name="content" onInput={handleInput} />
            <button type="submit">Send</button>
        </form>
    );
};
