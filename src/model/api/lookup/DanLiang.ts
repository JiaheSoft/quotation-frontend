import jQuery from "jquery";
import { apiBaseUrl } from "../ApiBase";

import { Token } from "../Login";
import ProductModel from "../../lookup/ProductModel";
import Price from "../../lookup/Price";

export interface LookupParam {
  token: Token,
  model: ProductModel
}

export function danLiangPrice(
  param: LookupParam,
  onSuccess: (price: Price) => void,
  onFailure: (errMsg: string) => void
): void {
  jQuery.ajax({
    url: apiBaseUrl + "/danliang/getmodel"
      + `?token=${param.token.tokStr}`,
    type: "POST",
    dataType: "json",
    data:
      {
        TypeName: param.model.type,
        DunWei: new String(param.model.weight),
        Kuadu: new String(param.model.length)
      }
  }).done(resp => {
    if (resp.succeed) {
      const msgCode = resp.MsgCode;
      const priceIncludingTax = msgCode.priceIncludingTax;
      const priceExcludingTax = msgCode.priceExcludingTax;
      onSuccess(new Price(priceIncludingTax, priceExcludingTax));
    } else {
      onFailure(resp.MsgCode);
    }
  }).fail((xhr, status, error) => {
    onFailure("网络错误");
  });
}