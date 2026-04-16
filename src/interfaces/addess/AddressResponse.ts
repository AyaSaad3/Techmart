import { Address } from "./Address";

export interface AddressResponse {
    results: number;
    status: string;
    data: Address[];
}