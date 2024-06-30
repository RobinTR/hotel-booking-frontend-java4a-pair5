import { RoomType } from "../../room-type/models/room-type";
import { RoomImage } from "./room-image";

export interface Room {
    id: number;
    roomType: RoomType;
    number: number;
    cost: number;
    imageUrls: RoomImage[];
    isAvailable: boolean;
}