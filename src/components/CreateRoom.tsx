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
        <div>
            <div class="container mx-auto max-w-md  ">
                <form onSubmit={handleSubmit} class="relative">
                    <input
                        type="text"
                        placeholder="Room Name"
                        name="name"
                        onInput={handleInput}
                        value={data.name}
                        class="border border-purple-500 placeholder:text-purple-500  rounded-full w-full px-6 py-3"
                    />
                    <button
                        type="submit"
                        class="absolute border rounded-full px-8 py-3 top-2 bottom-2 right-2 flex justify-center items-center bg-gradient-to-tr from-purple-500 to-blue-500 text-white"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};
