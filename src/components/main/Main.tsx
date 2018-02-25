import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction
} from "material-ui";
import ShopIcon from "material-ui-icons/Shop";
import ShoppingCartIcon from "material-ui-icons/ShoppingCart"
import Shopping from "./Shopping";
import Cart from "./cart/Cart";

import User from "../../model/User";
import fixThis from "../../util/FixThis";
import ItemModel from "../../model/cart/Item";

interface Props {
  user: User;
  onLogout: () => void;
}

interface State {
  page: React.ReactNode;
}

export default class Main extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);

    this.state =
      {
        page: this.newShoppingPage()
      };
  }

  public render(): React.ReactNode {
    return (<>
      {this.state.page}

      <BottomNavigation
        value={this.state.page}
        onChange={this.handleNavChange}
        showLabels
        style={{
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          width: "100%"
        }}
      >
        <BottomNavigationAction
          label="商品" icon={<ShopIcon />}
          value={this.newShoppingPage()} />
        <BottomNavigationAction
          label="购物车" icon={<ShoppingCartIcon />}
          value={this.newCartPage()} />
      </BottomNavigation>
    </>);
  }

  private newShoppingPage(): React.ReactNode {
    return (
      <Shopping user={this.props.user}
        onLogout={this.props.onLogout}
        onAddToCart={this.handleAddToCart}
        />
    );
  }

  private newCartPage(): React.ReactNode {
    return (
      <Cart user={this.props.user}
        onLogout={this.props.onLogout} />
    );
  }

  private handleNavChange(event: React.ChangeEvent<{}>, value: React.ReactNode) {
    this.setState({
      page: value
    });
  }

  private handleAddToCart(item: ItemModel): boolean {
    // TODO 添加item到购物车。

    return false;
  }
}
