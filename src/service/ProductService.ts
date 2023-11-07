import {ProductRequest} from "../domain/entity/ProductRequest";
import {Db, tabelaProdutos} from "../db/db";
import {ProductRepositoryInterface} from "../domain/repository/ProductRepositoryInterface";

export class ProductService {

    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    static async createProduct({ nome, descricao, preco, estoque }: ProductRequest) {
        console.log(
            `Criando produto nome: ${nome}, descricao ${descricao}: , preco: ${preco}, estoque: ${estoque}`
        );

        const product = await Db.create(
            {
                data: {
                    nome,
                    descricao,
                    preco,
                    estoque,
                },
            },
            tabelaProdutos
        );

        return product;
    }

    static async deleteProductById(id: number) {

        console.log(`Deletando o produto com id ${id}`);

        const product = await Db.delete(id, tabelaProdutos);

        return product;
    }

    static async getAllProductService() {
        console.log(`Resgatando todos os produtos`);

        const products = await Db.find(tabelaProdutos);

        return products;
    }

    static async getProductById(id: number) {
        console.log(`Resgatando o produto com id ${id}`);

        const product = await Db.findById(id, tabelaProdutos);

        return product;
    }

    static async updateProduct(
        { nome, descricao, preco, estoque }: ProductRequest,
        id: number
    ) {
        console.log(
            `Atualizando produto com id ${id} para:\n nome: ${nome}, descricao ${descricao}: , preco: ${preco}, estoque: ${estoque}`
        );

        const product = Db.update(
            id,
            {
                nome,
                descricao,
                preco,
                estoque,
            },
            tabelaProdutos
        );

        return product;
    }
}