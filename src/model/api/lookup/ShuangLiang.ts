import jQuery from "jquery";
import { apiBaseUrl } from "../ApiBase";
import Price from "../../lookup/Price";
import { Token } from "../Login";
import ProductModel from "../../lookup/ProductModel";

export interface LookupParam {
  token: Token;
  name: string;
  model: ProductModel;
}

export function shuangLiangPrice(
  param: LookupParam,
  onSuccess: (price: Price) => void,
  onFailure: (errMsg: string) => void) {
  jQuery.ajax({
    url: apiBaseUrl + "/shuangliang/getmodel"
      + '?' + `token=${param.token.tokStr}`,
    type: "POST",
    dataType: "json",
    data:
      {
        SLClass: param.name,
        InvType: param.model.type,
        DunWei: new String(param.model.weight),
        KuaDu: new String(param.model.length)
      }
  }).done(response => {
    if (response.succeed) {
      const priceIncludingTax = Number.parseFloat(response.MsgCode.priceIncludingTax);
      const priceExcludingTax = Number.parseFloat(response.MsgCode.priceExcludingTax);
      onSuccess(new Price(priceIncludingTax, priceExcludingTax));
    } else {
      onFailure(response.MsgCode);
    }
  }).fail(() => {
    onFailure("网络错误");
  });
}