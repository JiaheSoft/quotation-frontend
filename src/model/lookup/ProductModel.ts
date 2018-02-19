
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
    if (ProductModel.isValidStr(model)) {
      return new ProductModel(model);
    } else {
      return null;
    }
  }

  public static isValidStr(model: string) {
    const pattern: RegExp = /^[a-z]+\d+(?:\.\d+)?t\-\d+(?:\.\d+)?m$/i;
    return pattern.test(model);
  }
}