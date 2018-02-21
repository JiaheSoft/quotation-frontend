import * as React from "react";
import Menu, { MenuItem } from "material-ui/Menu";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Button
} from "material-ui";
import AccountCircle from "material-ui-icons/AccountCircle";

import fixThis from "../../util/FixThis";
import User from "../../model/User";

interface AccountMenuProps {
  onLogout?: () => void;
  user?: User | null;
}

interface AccountMenuState {
  menuOpen: boolean;
  menuAnchorEl: HTMLElement | undefined;
  profileDialogOpen: boolean;
}

export default class AccountMenu extends React.Component<AccountMenuProps, AccountMenuState> {
  public static defaultProps: Partial<AccountMenuProps> =
    {
      onLogout: () => { },
      user: null
    }

  public constructor(props: {}) {
    super(props);
    fixThis(this);

    this.state =
      {
        menuOpen: false,
        menuAnchorEl: undefined,
        profileDialogOpen: false
      };
  }

  public render(): React.ReactNode {
    return (
      <div>
        <IconButton
          onClick={this.handleMenuOpen}
          disabled={!this.props.user}
        ><AccountCircle />
        </IconButton>

        <Menu
          anchorEl={this.state.menuAnchorEl}
          open={this.state.menuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.menuClickHandlerBuilder(this.handleOpenDialog)}>账户信息</MenuItem>
          <MenuItem onClick={this.menuClickHandlerBuilder(this.props.onLogout)}>注销</MenuItem>
        </Menu>

        <Dialog
          open={this.state.profileDialogOpen}
        > <DialogContent>
            <DialogContentText>
              用户名：{this.props.user ? this.props.user.name : "guest"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" color="primary" onClick={this.handleCloseDialog}>好的</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private handleMenuOpen(e: React.MouseEvent<HTMLElement>): void {
    this.setState({
      menuOpen: true,
      menuAnchorEl: e.currentTarget
    });
  }

  private handleMenuClose(): void {
    this.setState({ menuOpen: false });
  }

  private menuClickHandlerBuilder(handler: (() => void) | undefined): (e: React.MouseEvent<HTMLElement>) => void {
    return e => {
      this.handleMenuClose();
      if (handler)
        handler();
    };
  }

  private handleOpenDialog(): void {
    this.setState({
      profileDialogOpen: true
    });
  }

  private handleCloseDialog(): void {
    this.setState(
      { profileDialogOpen: false }
    );
  }
}