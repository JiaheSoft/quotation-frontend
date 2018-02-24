import Item from "./Item";
import User from "../User";

export default class Cart {
  private items_: Item[] = [];
  public get items(): Item[] { return this.items_; }

  private constructor() {
  }

  public static emptyCart(): Cart {
    return new Cart();
  }

  public static loadAsync(
    user: User,
    onSuccess: (cart: Cart) => void,
    onFailure: (errMsg: string) => void = () => {}
  ): Cart {
    // TODO

    return Cart.emptyCart();
  }

  public updateItemAt(
    index: number,
    updater: (item: Item) => Item)
    : Cart {
    let newCart: Cart = new Cart();
    Object.assign(newCart, this);
    const newItem = updater(newCart.items_[index]);
    newCart.items_[index] = newItem;
    return newCart;
  }

  public deleteItemAt(index: number): Cart {
    let newCart: Cart = new Cart();
    Object.assign(newCart, this);
    newCart.items_.splice(index, 1);
    return newCart;
  }

  public clear(): Cart {
    return new Cart();
  }

  // 高效删除多个item。假定index里面的值不重复
  // public deleteItemsAt(...index: number[]): Cart {
  //   let newCart: Cart = new Cart();
  //   if (index.length === 0) {
  //     Object.assign(newCart, this);
  //     return newCart;
  //   }
  //   index.sort();
  //   let i = 0;
  //   for (let j = 0; j < this.items_.length; ++j) {
  //     if (j !== index[i]) {
  //       newCart.items_.push(this.items_[j]);
  //     } else {
  //       ++i;
  //     }
  //   }
  //   return newCart;
  // }
}

