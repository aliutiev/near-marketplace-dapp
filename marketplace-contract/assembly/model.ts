import { PersistentUnorderedMap, u128, context } from "near-sdk-as";
// LINK: https://dacade.org/communities/near/courses/near-101/learning-modules/b52ba9f1-caac-4339-96ed-fad3b1ab6bbd


@nearBindgen
// We use the @nearBindgen decorator to serialize our custom class before storing it on the blockchain.


export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    owner: string;
    sold: u32;

    // This numeric data types are specific to NEAR and are recommended to use instead of the TypeScript numeric 
    // types to avoid issues with data type conversion.

    public static fromPayload(payload: Product): Product {
        const product = new Product();
        
        product.id = payload.id;
        product.name = payload.name;
        product.description = payload.description;
        product.image = payload.image;
        product.location = payload.location;
        product.price = payload.price;
        product.owner = context.sender;

        return product;
    }

    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
}

export const listedProducts = new PersistentUnorderedMap<string, Product>("LISTED_PRODUCTS");