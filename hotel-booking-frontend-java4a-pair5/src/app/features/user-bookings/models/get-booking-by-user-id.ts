import { Citizen } from "../../booking/models/citizen";
import { PaymentStatus } from "../../payment-status/models/payment-status";
import { ReservationStatus } from "../../reservation-status/models/reservation-status";

export interface GetBookingByUserIdResponse {
    id: number;
    hotel: HotelForBooking;
    guest: GuestForBooking;
    paymentMethod: PaymentMethod;
    startDate: string;
    endDate: string;
    checkInDate: string;
    checkOutDate: string;
    totalCost: number;
    paymentStatus: PaymentStatus;
    reservationStatus: ReservationStatus;
    roomBooked: RoomBooked[];
    citizenOfBookings: Citizen[];
  }
  
  export interface HotelForBooking {
    id: number;
    name: string;
    contactNumber: string;
    email: string;
    website: string;
    description: string;
  }
  
  export interface GuestForBooking {
    id: number;
    user: UserForBooking;
  }

  export interface UserForBooking {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }
  
  export interface PaymentMethod {
    id: number;
    name: string;
  }
  
  export interface RoomBooked {
    id: number;
    room: RoomForBooking;
  }

  export interface RoomForBooking {
    id: number;
    number: number;
    cost: number;
  }