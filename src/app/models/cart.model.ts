export class Cart {
    productId:number;
    name:string;
    price:number;
    imageUrl:string;
    quantity:number;
    description:string;
    stock:number;
    constructor(){
        this.productId=0;
        this.name="";
        this.price=0;
        this.imageUrl="";
        this.quantity=1;
        this.description="";
        this.stock=0;
    }
}
