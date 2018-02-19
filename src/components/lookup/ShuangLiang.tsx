import * as React from "react";
import fixThis from "../../util/FixThis";
import Common from "./Common";

import Price from "../../model/lookup/Price";

interface Props {

}

interface State {

}

export default class ShuangLiang extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  render(): React.ReactNode {
    return (
      <Common
        onLookup={this.handleLookup}
        types={["新型", "标准"]}
        title="双梁查询"
      />
    );
  }

  private handleLookup(model: string, type: string): Price | null {
    alert(`执行双梁查询，model=${model}, type=${type}`);
    return null;
  }
}