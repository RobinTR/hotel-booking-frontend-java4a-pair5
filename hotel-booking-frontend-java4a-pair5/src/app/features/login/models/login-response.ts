import { LoggedUser } from "./logged-user";

export interface LoginResponse {
    message: string;
    data: string;
    success: boolean;
}