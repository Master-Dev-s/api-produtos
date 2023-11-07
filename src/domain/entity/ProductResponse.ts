import {ProductRequest} from "./ProductRequest";

export interface ProductResponse {
    id: number;
    dados: ProductRequest;
    createdAt: Date;
    updatedAt: Date;
}