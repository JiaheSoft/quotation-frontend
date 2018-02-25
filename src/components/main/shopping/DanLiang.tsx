import * as React from "react";
import fixThis from "../../../util/FixThis";
import ProductModel from "../../../model/lookup/ProductModel";
import Price from "../../../model/lookup/Price";
import User from "../../../model/User";
import {
  TextField,
  Button
} from "material-ui";
import Common from "./Common";

import { danLiangPrice } from "../../../model/api/lookup/DanLiang";

interface Props {
  user: User
}

interface State {
  result: Price | null;
}

export default class DanLiang extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  render(): React.ReactNode {
    return (
      <Common
        onLookup={this.handleLookup}
        title="单梁查询"
      />
    );
  }

  private handleLookup(
    modelStr: string, type: string,
    onSuccess: (price: Price) => void,
    onFailure: (errMsg: string) => void
  ): void {
    const model: ProductModel | null = ProductModel.fromString(modelStr);
    if (!model) {
      onFailure("型号非法");
    } else {
      const token = this.props.user.token;
      if (token) {
        danLiangPrice(
          {
            token: token,
            model: model
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
}