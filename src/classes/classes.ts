export class Product{
  public itemId;
  public title;
  public price;
  public quantity;
  public description;

  public constructor (itemId:string, title:string, price:string, quantity:string, description:string) {
    this.itemId =itemId;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}
