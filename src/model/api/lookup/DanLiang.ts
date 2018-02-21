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
  const queryString: string =
    `token=${param.token.tokStr}&modelstr=${param.model.modelStr}`;
  jQuery.ajax({
    url: apiBaseUrl + "/danliang/getmodel",
    type: "GET",
    dataType: "json",
    data: queryString
  }).done(resp => {
    if (resp.succeed) {
      const msgCode = JSON.parse(resp.MsgCode);
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