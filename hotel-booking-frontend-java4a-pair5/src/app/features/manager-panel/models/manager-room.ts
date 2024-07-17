export interface ManagerRoom {
    id: number | undefined;
    hotelId: number | null | undefined;
    roomTypeId: number | null | undefined;
    number: number;
    cost: number;
}