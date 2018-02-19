
export default class ProductModel {
  private modelStr_: string;
  public get modelStr(): string {
    return this.modelStr_;
  }

  private constructor(modelStr: string) {
    this.modelStr_ = modelStr;
  }

  public static fromString(model: string)
    : ProductModel | null {
    // TODO Validate the model

    return new ProductModel(model);
  }
}