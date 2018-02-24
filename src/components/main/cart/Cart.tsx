import * as React from "react";
import TopBar from "../../topbar/TopBar";
import InfoPopup from "../../common/InfoPopup";

import fixThis from "../../../util/FixThis";
import User from "../../../model/User";
import CartModel from "../../../model/cart/Cart";
import ItemModel from "../../../model/cart/Item";

interface Props {
  user: User;
  onLogout: () => void;
}

interface State {
  cart: CartModel;

  showErrorMessage: boolean;
  errorMessage: string;
}

export default class Cart extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);
    this.state = {
      cart: CartModel.emptyCart(),
      showErrorMessage: false,
      errorMessage: ""
    };
  }

  public componentDidMount() {
    CartModel.loadAsync(this.props.user,
      (cart: CartModel) => {
        this.setState({ cart });
      },
      (errMsg: string) => {
        this.setState({
          showErrorMessage: true,
          errorMessage: errMsg
        });
      }
    );
  }

  public render(): React.ReactNode {
    return (<>
      <TopBar user={this.props.user}
        onLogout={this.props.onLogout}
      />
      <InfoPopup
        open={this.state.showErrorMessage}
        onClose={() => this.setState({ showErrorMessage: false })}
        text={this.state.errorMessage}
        type="warning"
      />
    </>);
  }
}
