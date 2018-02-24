import ProductModel from "../lookup/ProductModel";

export default class Item {
  private id_: number = 0;
  public get id(): number { return this.id_; }

  private type_: string = "";
  public get type(): string { return this.type_; }

  private model_: ProductModel = ProductModel.fromValidString("ld5t-21m");
  public get model(): ProductModel { return this.model_; }

  private count_: number = 1;
  public get count(): number { return this.count_; }

  private constructor() {
  }

  public static newItem(id: number, type: string, model: ProductModel): Item {
    let item = new Item();
    item.id_ = id;
    item.type_ = type;
    item.model_ = model;
    return item;
  }

  public increaseCount(step: number = 1): Item {
    let result: Item = new Item();
    Object.assign(result, this);
    result.count_ += step;
    return result;
  }

  public decreaseCount(step: number = 1): Item {
    return this.increaseCount(-step);
  }
}