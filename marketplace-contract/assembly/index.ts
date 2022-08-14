import { Product, listedProducts } from "./model";
import { ContractPromiseBatch, context } from 'near-sdk-as';

export function setProduct(product: Product): void {
    let storedProduct = listedProducts.get(product.id);
    if (storedProduct != null){
        throw new Error(`a product with ${product.id} already exists`);
    }
    listedProducts.set(product.id, Product.fromPayload(product));
}

export function getProduct(id:string): Product | null {
    return listedProducts.get(id);
}

export function getProducts(): Product[]{
    return listedProducts.values();
}

export function buyProduct(productId: string): void {
    const product = getProduct(productId);
    if (product == null){
        throw new Error(`product not found`);
    }
    if (product.price.toString() != context.attachedDeposit.toString()){
        throw new Error("attached deposit should equal the product's price");
    }

    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
    product.incrementSoldAmount();
    listedProducts.set(product.id, product);
}

// FIRST INSTANCE OF INDEX.TS

// export const products = new PersistentUnorderedMap<string, string> ("PRODUCTS");

// export function setProduct(id: string, productName: string): void {
//     products.set(id, productName);
// }

// export function getProduct(id:string): string | null {
//     return products.get(id);
// }
    
// Warning: The key for the persistent collection should be as short as possible to reduce storage space 
// because this key will be repeated for every record in the collection. Here, we only used the longer 
// PRODUCTS key to add more readability for first-time NEAR developers.