import { RoomType } from "../../room-type/models/room-type";

export interface Room {
    id: number;
    roomType: RoomType;
    number: number;
    cost: number;
    isAvailable: boolean;
}