import { ProductRequest } from "../domain/entity/ProductRequest";
import { Db, tabelaProdutos } from "../db/db";

export function validationProductData(requestBody: ProductRequest) {
  if (
    typeof requestBody.nome !== "string" ||
    typeof requestBody.descricao !== "string" ||
    typeof requestBody.preco !== "number" ||
    typeof requestBody.estoque !== "number"
  ) {
    const error: any = new Error("Dados Invalidos");
    error.status = 400;
    console.error(error.message);
    return error;
  }
}

export async function validationProductUpdate(
  requestBody: ProductRequest,
  id: number
) {
  const dataIsValid = validationProductData(requestBody);
  if (dataIsValid instanceof Error) {
    return dataIsValid;
  }

  const idIsValid = await validationProductId(id);
  if (idIsValid instanceof Error) {
    return idIsValid;
  }
}

export async function validationProductId(id: number) {
  if (
    id === undefined ||
    id === null ||
    typeof id !== "number" ||
    Number.isNaN(id)
  ) {
    const error: any = new Error("parametro id inválido");
    error.status = 400;
    console.error(error.message);
    return error;
  } else {
    const productExists = await Db.findById(id, tabelaProdutos);

    if (!productExists) {
      const error: any = new Error("Produto não encontrado");
      error.status = 404;
      console.error(error.message);
      return error;
    }
  }
}
