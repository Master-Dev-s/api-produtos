import {ProductController} from "../controller/product/ProductController";


const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

export { productController }