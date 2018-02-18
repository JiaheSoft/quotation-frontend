import * as React from "react";
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
import fixThis from "../util/FixThis";
import AccountMenu from "./AccountMenu";
import User from "../model/User";

const logo = require("./logo.png");

interface TopBarProps {
  onLogout?: () => void;
  user?: User | null;

  onReturnHome?: () => void;
}

export default class TopBar extends React.Component<TopBarProps, {}> {
  public static defaultProps: Partial<TopBarProps> = {
    onLogout: () => { },
    user: null,
    onReturnHome: () => { }
  };

  public constructor(props: TopBarProps) {
    super(props);
    fixThis(this);

  }

  render(): React.ReactNode {
    return (
      <div>
        <AppBar color="default" position="static">
          <Toolbar disableGutters>
            <IconButton onClick={this.props.onReturnHome}>
              <ArrowBack />
            </IconButton>
            <img src={logo} />
            {/* <Typography variant="title" align="center" color="inherit" style={{ flex: 1 }}>
              业务员查询系统
            </Typography> */}
            <Typography variant="subheading" align="left" color="inherit">
              业务经理查询
            </Typography>
            <div style={{ flex: 1 }}></div>

            <AccountMenu
              onLogout={this.props.onLogout}
              user={this.props.user} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}