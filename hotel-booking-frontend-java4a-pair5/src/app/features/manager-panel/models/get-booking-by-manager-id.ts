import { ReservationStatus } from "../../reservation-status/models/reservation-status";
import { GuestForBooking, HotelForBooking, RoomBooked } from "../../user-bookings/models/get-booking-by-user-id";

export interface GetBookingByManagerIdResponse {
  id: number;
  hotel: HotelForBooking;
  guest: GuestForBooking;
  startDate: string;
  endDate: string;
  totalCost: number;
  reservationStatus: ReservationStatus;
  roomBooked: RoomBooked[];
}