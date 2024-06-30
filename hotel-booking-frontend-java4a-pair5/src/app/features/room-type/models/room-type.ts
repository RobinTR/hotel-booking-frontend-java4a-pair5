import { RoomTypeFeature } from "./room-type-feature";

export interface RoomType {
    id: number;
    name: String;
    description: String;
    capacity: number;
    features: RoomTypeFeature[];
    allInclusive: boolean;
}