import { Injectable } from "@angular/core";
import { Hotel } from "../../hotels/models/hotel";
import { Room } from "../../room/models/room";

@Injectable({
    providedIn: 'root'
})
export class HotelDetailsService {
    hotelData?: Hotel;
    roomData?: Room;
}