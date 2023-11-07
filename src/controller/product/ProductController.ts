import {NextFunction, Request, Response} from "express";
import {ProductRequest} from "../../domain/entity/ProductRequest";
import {validationProductData, validationProductId, validationProductUpdate} from "../../validation/validations";
import {
    CreateProductService,
    DeleteProductByIdService,
    GetAllProductService,
    GetProductByIdService, UpdateProductService
} from "../../service";

export class ProductController {

    async createdProduct(request: Request, response: Response, next: NextFunction) {
        const requestBody: ProductRequest = request.body;
        const { nome, descricao, preco, estoque } = request.body;

        const isValid = validationProductData(requestBody);
        if (isValid instanceof Error) {
            next(isValid);
        } else {
            const product = await CreateProductService.execute({
                nome,
                descricao,
                preco,
                estoque,
            });

            return response.json(product);
        }
    }

    async deleteProduct(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;

        const isValid = await validationProductId(Number(id));
        if (isValid instanceof Error) {
            next(isValid);
        }

        const product = await DeleteProductByIdService.execute(Number(id));

        return response.json(product);
    }

    async getAllProduct(request: Request, response: Response, next: NextFunction) {
        const products = await GetAllProductService.execute();

        return response.json(products);
    }

    async getProductById(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;

        const isValid = await validationProductId(Number(id));
        if (isValid instanceof Error) {
            next(isValid);
        }

        const product = await GetProductByIdService.execute(Number(id));

        return response.json(product);
    }

    async updateProduct(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;

        const requestBody: ProductRequest = request.body;
        const { nome, descricao, preco, estoque } = request.body;

        const isValid = await validationProductUpdate(requestBody, Number(id));
        if (isValid instanceof Error) {
            next(isValid);
        } else {
            const product = await UpdateProductService.execute(
                { nome, descricao, preco, estoque },
                Number(id)
            );

            return response.json(product);
        }
    }
}