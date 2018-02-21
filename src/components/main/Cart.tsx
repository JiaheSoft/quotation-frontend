import * as React from "react";
import TopBar from "../topbar/TopBar";

import fixThis from "../../util/FixThis";
import User from "../../model/User";

interface Props {
  user: User;
  onLogout: () => void;
}

interface State {

}

export default class Cart extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);

  }

  public render(): React.ReactNode {
    return (<>
      <TopBar user={this.props.user}
        onLogout={this.props.onLogout}
      />
      <p>购物车</p>
    </>);
  }
}
