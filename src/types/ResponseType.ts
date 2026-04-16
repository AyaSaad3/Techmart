import { IMetadata } from "@/interfaces/product/IMetadata";

export type ResponseType<type> = {
    results: number;
    metadata: IMetadata;
    data: type[];
}