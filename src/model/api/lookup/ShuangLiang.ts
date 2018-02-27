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
  const queryParams: string =
    `token=${param.token.tokStr}&modelStr=${param.model.modelStr}&strSLClass=${param.name}`;
  jQuery.ajax({
    url: apiBaseUrl + "/shuangliang/getmodel",
    type: "GET",
    dataType: "json",
    data: queryParams
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