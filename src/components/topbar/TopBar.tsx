import * as React from "react";
import Space from "../common/Space";
import {
  AppBar,
  Button,
  Icon,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography
} from "material-ui";
import ArrowBack from "material-ui-icons/ArrowBack";
import fixThis from "../../util/FixThis";
import AccountMenu from "./AccountMenu";
import User from "../../model/User";

const logo = require("../../resources/logo.png");

interface TopBarProps {
  user?: User;
  onLogout?: () => void;
  onReturn?: () => void;
}

export default class TopBar extends React.Component<TopBarProps, {}> {
  public constructor(props: TopBarProps) {
    super(props);
    fixThis(this);
  }

  public render(): React.ReactNode {
    return (
      <div
        style={{ marginBottom: "1em" }}
      >
        <AppBar color="default" position="static"
        >
          <Toolbar disableGutters>
            {this.newReturnButton()}
            <Space />
            <img src={logo} />
            <Typography variant="subheading" align="left" color="inherit">
              业务经理查询
            </Typography>
            <Space />
            {this.newAccountMenuButton()}
          </Toolbar>
        </AppBar>
      </div>);
  }

  private newReturnButton(): React.ReactNode {
    return (<>
      <IconButton onClick={this.props.onReturn}
        disabled={!this.props.onReturn}>
        <ArrowBack />
      </IconButton>
    </>);
  }

  private newAccountMenuButton(): React.ReactNode {
    return (
      <AccountMenu
        onLogout={this.props.onLogout}
        user={this.props.user}
      />
    );
  }
}