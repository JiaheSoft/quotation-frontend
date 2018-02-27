import * as React from "react";
import {
  List,
  Button
} from "material-ui";
import TopBar from "../../topbar/TopBar";
import InfoPopup from "../../common/InfoPopup";
import Item from "./Item";

import fixThis from "../../../util/FixThis";
import User from "../../../model/User";
import CartModel from "../../../model/cart/Cart";
import ItemModel from "../../../model/cart/Item";
import * as CartAPI from "../../../model/api/Cart";
import Space from "../../common/Space";

interface Props {
  user: User;
  onLogout: () => void;
}

interface State {
  cart: CartModel;
  selected: boolean[]; // TODO 实现多项选择以及下定单功能

  showErrorMessage: boolean;
  errorMessage: string;
}

export default class Cart extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);
    this.setState = this.setState.bind(this);
    this.state = {
      cart: CartModel.emptyCart(),
      selected: new Array<boolean>(0),
      showErrorMessage: false,
      errorMessage: ""
    };
  }

  public componentDidMount() {
    if (this.props.user.token) {
      CartAPI.getAll(this.props.user.token,
        (cart: CartModel) => {
          this.setState({ cart });
        },
        (errMsg: string) => {
          this.setState({
            errorMessage: errMsg,
            showErrorMessage: true
          });
        }
      );
    }
  }

  public render(): React.ReactNode {
    return (<>
      <TopBar user={this.props.user}
        onLogout={this.props.onLogout}
      />
      <div style={{ padding: "1.5em" }}>
        <InfoPopup
          open={this.state.showErrorMessage}
          onClose={() => this.setState({ showErrorMessage: false })}
          text={this.state.errorMessage}
          type="warning"
        />
        <div style={{ textAlign: "right" }}>
          <Button variant="raised" color="primary"
            onClick={this.handleClearCart}
          > 清空购物车
          </Button>
        </div>
        <List>
          {this.state.cart.items.map((item, index) =>
            // TODO 这里需要优化
            <Item
              key={index}
              item={item}
              onIncrease={() => this.handleIncrease(index)}
              onDecrease={() => this.handleDecrease(index)}
              onRemove={() => this.handleRemove(index)}
            />
          )}
        </List>
      </div>
    </>);
  }

  private updateCart(newCart: CartModel) {
    this.setState({ cart: newCart });
  }

  private handleIncrease(index: number) {
    this.updateCart(
      this.state.cart.updateItemAt(index,
        item => item.increaseCount())
    );
  }

  private handleDecrease(index: number) {
    this.updateCart(
      this.state.cart.updateItemAt(index,
        item => item.decreaseCount())
    );
  }

  private handleRemove(index: number) {
    this.updateCart(
      this.state.cart.deleteItemAt(index)
    );
  }

  private handleClearCart() {
    this.setState({
      cart: CartModel.emptyCart()
    });
  }
}
