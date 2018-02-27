import jQuery from "jquery";
import * as ApiBase from "./ApiBase";
import Item from "../cart/Item";
import Cart from "../cart/Cart";
import { Token } from "./Login";
import ProductModel from "../lookup/ProductModel";

export function add(
  userToken: Token,
  item: Item, // ID will NOT be preserved
  onFinish: (succeeded: boolean) => void)
  : void {
  const queryString: string =
    `token=${userToken.tokStr}`;
  jQuery.ajax({
    url: ApiBase.apiBaseUrl + "/shoppingcart/add" + '?'
      + queryString,
    type: "POST",
    dataType: "json",
    data:
      {
        "InvName": item.name,
        "InvType": item.model.type,
        "InvWeight": item.model.weight,
        "InvLength": item.model.length,
        "Quantity": 1
      }
  }).done((response) => {
    onFinish(response.succeed);
  }).fail(() => {
    onFinish(false);
  });
}

export function getAll(
  userToken: Token,
  onSuccess: (cart: Cart) => void,
  onFailure: (errMsg: string) => void
) {
  const queryParams: string =
    `token=${userToken.tokStr}`;
  jQuery.ajax({
    url: ApiBase.apiBaseUrl + "/shoppingcart/getall",
    type: "GET",
    dataType: "json",
    data: queryParams
  }).done(response => {
    if (response.succeed) {
      const respObj: Array<any> = response.MsgCode;
      const items = respObj.map(x => {
        const model: ProductModel = new ProductModel(x.InvType, x.InvLength, x.InvWeight);
        return Item.newItem(x.ID, x.InvName, model);
      });
      const cart = Cart.fromItems(items);
      onSuccess(cart);
    } else {
      onFailure(response.MsgCode);
    }
  }).fail(() => {
    onFailure("网络错误");
  });
}