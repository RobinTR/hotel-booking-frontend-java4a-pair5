export interface AddHotel {
    fullAddress: string;
    name: string;
    contactNumber: string;
    email: string;
    website?: string;
    description?: string;
    floorCount: number;
    starRating: number;
}