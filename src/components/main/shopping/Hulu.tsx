import * as React from "react";
import fixThis from "../../../util/FixThis";
import Common from "./Common";
import Price from "../../../model/lookup/Price";

interface Props {

}

interface State {

}

export default class Hulu extends React.Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  public render(): React.ReactNode {
    return (
      <Common
        title="葫芦查询"
        names={["普通葫芦", "防爆葫芦", "国产欧式葫芦", "进口欧式葫芦"]}
        onLookup={this.handleLookup}
      />
    );
  }

  private handleLookup(model: string, type: string): Price | null {
    alert(`执行葫芦查询，model=${model}, type=${type}`);
    return null;
  }
}