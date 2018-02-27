
export default class ProductModel {
  private type_: string = "";
  public get type(): string { return this.type_; }

  private length_: number = 0;
  public get length(): number { return this.length_; }

  private weight_: number = 0;
  public get weight(): number { return this.weight_; }

  public get modelStr(): string {
    return `${this.type_}${this.weight_}t-${this.length_}m`;
  }

  public constructor(type: string, length: number, weight: number) {
    this.type_ = type;
    this.length_ = length;
    this.weight_ = weight;
  }

  public static fromString(model: string)
    : ProductModel | null {
    if (ProductModel.isValidStr(model)) {
      return this.fromValidString(model);
    } else {
      return null;
    }
  }

  public static fromValidString(validModel: string): ProductModel {
    let fromIndex: number = 0;
    const type: string = takeWhile(validModel, 0, isAlpha);
    fromIndex += type.length;

    const weightStr: string = takeWhile(validModel, fromIndex,
      ch => isDigit(ch) || ch === '.');
    const weight: number = Number.parseFloat(weightStr);
    fromIndex = validModel.indexOf('-') + 1;

    const lengthStr: string = takeWhile(validModel, fromIndex,
      ch => isDigit(ch) || ch === '.');
    const length: number = Number.parseFloat(lengthStr);

    return new ProductModel(type, length, weight);
  }

  public static isValidStr(model: string) {
    const pattern: RegExp = /^[a-z]+\d+(?:\.\d+)?t?\-\d+(?:\.\d+)?m?$/i;
    return pattern.test(model);
  }

}

function takeWhile(str: string, from: number, predicate: (ch: string) => boolean): string {
  let i = from;
  for (; i < str.length; ++i) {
    if (!predicate(str.charAt(i))) {
      break;
    }
  }
  return str.substr(from, i - from);
}

function isAlpha(ch: string): boolean {
  return ('a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z');
}

function isDigit(ch: string): boolean {
  return '0' <= ch && ch <= '9';
}