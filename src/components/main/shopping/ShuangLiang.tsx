import * as React from "react";
import fixThis from "../../../util/FixThis";
import Common from "./Common";

import Price from "../../../model/lookup/Price";
import User from "../../../model/User";
import { shuangLiangPrice } from "../../../model/api/lookup/ShuangLiang";
import ProductModel from "../../../model/lookup/ProductModel";

interface Props {
  user: User;
}

export default class ShuangLiang extends React.Component<Props> {

  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  render(): React.ReactNode {
    return (
      <Common
        onLookup={this.handleLookup}
        names={["新型双梁", "标准双梁"]}
        title="双梁查询"
        user={this.props.user}
      />
    );
  }

  private handleLookup(
    model: string, name: string,
    onSuccess: (price: Price) => void,
    onFailure: (errMsg: string) => void
  ): void {
    if (this.props.user.token) {
      shuangLiangPrice(
        {
          token: this.props.user.token,
          name: name,
          model: ProductModel.fromValidString(model)
        },
        (price: Price) => {
          onSuccess(price);
        },
        (errMsg: string) => {
          onFailure(errMsg);
        }
      );
    }
  }
}