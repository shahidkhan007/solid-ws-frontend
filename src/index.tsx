/* @refresh reload */
import { Route, Router, Routes } from "@solidjs/router";
import { render } from "solid-js/web";
import "../src/css/base.css";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { Rooms } from "./pages/Rooms";
import { MessageService } from "./services/MessageService";
import { RoomService } from "./services/RoomService";

const root = document.getElementById("root");

export const roomService = RoomService.getInstance();
export const messageService = MessageService.getInstance();

render(
    () => (
        <Router>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/rooms" component={Rooms} />
                <Route path="/room/:id" component={Room} />
            </Routes>
        </Router>
    ),
    root!
);
