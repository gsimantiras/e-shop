export class Product{
  public itemId;
  public title;
  public price;
  public count;
  public description;

  public constructor (itemId:string, title:string, price:string, count:string, description:string) {
    this.itemId =itemId;
    this.title = title;
    this.price = price;
    this.count = count;
    this.description = description;
  }
}
