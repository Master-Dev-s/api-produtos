import {Product} from "../entity/Product";
import {ProductRequest} from "../entity/ProductRequest";
import {ProductResponse} from "../entity/ProductResponse";

export interface ProductRepositoryInterface {
    findAll(): Promise<Product[]>

    create(data: ProductRequest, tabela: string) : Promise<ProductResponse>

    findById(id: number, tabela: string) : Promise<ProductResponse>

    find(tabela: string) : Promise<any[]>

    update(id: number, productData: ProductRequest, tabela: string) : Promise<ProductResponse>

    delete(id: number, tabela: string) : Promise<any>
}