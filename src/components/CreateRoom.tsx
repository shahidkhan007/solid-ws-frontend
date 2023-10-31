import { createStore } from "solid-js/store";
import { roomService } from "..";

export const CreateRoom = (props: { triggerRefetch: () => void }) => {
    const [data, setData] = createStore({
        name: "",
    });

    const handleInput = (ev: any) => {
        setData("name", ev.currentTarget.value);
    };

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();
        const res = await roomService.createRoom(data);

        if (res.entity) {
            props.triggerRefetch();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onInput={handleInput} value={data.name} />
            <button type="submit">Create</button>
        </form>
    );
};
