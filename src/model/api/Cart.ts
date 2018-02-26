import jQuery from "jquery";
import * as ApiBase from "./ApiBase";
import Item from "../cart/Item";
import Cart from "../cart/Cart";
import { Token } from "./Login";

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
        "InvName": item.type + item.name,
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