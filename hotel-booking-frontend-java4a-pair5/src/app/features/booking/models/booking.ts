import { Citizen } from "./citizen";

export interface Booking {
    hotelId: number;
    guestId: number;
    citizens: Citizen[];
    roomIds: number[];
    paymentMethodId: number;
    startDate: String;
    endDate: String;
}