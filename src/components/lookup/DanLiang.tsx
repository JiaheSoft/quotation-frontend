import * as React from "react";
import fixThis from "../../util/FixThis";
import ProductModel from "../../model/lookup/ProductModel";
import Price from "../../model/lookup/Price";
import {
  TextField,
  Button
} from "material-ui";
import Common from "./Common";

interface Props {
}

interface State {
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

  private handleLookup(model: string, type: string): Price | null {
    alert(`执行单梁查询，model=${model}, type=${type}`);
    return null;
  }
}