import { Room } from "../../room/models/room";
import { HotelFeature } from "./hotel-feature";

export interface Hotel {
    id: number;
    rooms: Room[];
    hotelFeatures: HotelFeature[];
    addressName: String;
    name: String;
    contactNumber: String;
    email: String;
    website: String;
    description: String;
    floorCount: number;
    starRating: number;
}