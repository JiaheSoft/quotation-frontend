import * as React from "react";
import fixThis from "../../util/FixThis";

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
      <div>
        <p>双梁</p>
      </div>
    );
  }
}