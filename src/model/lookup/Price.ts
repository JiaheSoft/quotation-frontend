
export default class Price {
  public constructor(withTax: number, withoutTax: number) {
    this.priceWithTax = withTax;
    this.priceWithoutTax = withoutTax;
  }

  private priceWithTax_: number = 0;
  public get priceWithTax(): number {
    return this.priceWithTax_;
  }
  public set priceWithTax(price: number) {
    this.priceWithTax_ = price;
  }

  private priceWithoutTax_: number = 0;
  public get priceWithoutTax(): number {
    return this.priceWithoutTax_;
  }
  public set priceWithoutTax(price: number) {
    this.priceWithoutTax_ = price;
  }
}