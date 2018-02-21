import * as React from "react";
import { Reboot } from "material-ui";

import Login from "./Login";
import TopBar from "./topbar/TopBar";
import Main from "./main/Main";
import fixThis from "../util/FixThis";
import User from "../model/User";

import { MuiThemeProvider } from "material-ui/styles";
import { theme } from "./Theme";

interface AppState {
  user: User | null;
  page: React.ReactNode;
}

export default class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    fixThis(this);

    const user = User.load();
    this.state = {
      user: user,
      page: this.newLoginComponent(user)
    };
  }

  private newLoginComponent(defaultUser: User | null): React.ReactNode {
    return (
      <Login
        onLogin={this.handleLogin}
        defaultUser={defaultUser ? defaultUser : undefined}
      />
    );
  }

  private newMainComponent(user: User): React.ReactNode {
    if (user) {
      return (
        <Main
          user={user}
          onLogout={this.handleLogout}
        />
      );
    } else {
      return <></>;
    }
  }

  public render(): React.ReactNode {
    return (
      <div>
        <Reboot />
        <MuiThemeProvider theme={theme}>
          {this.state.page}
        </MuiThemeProvider>
      </div>
    );
  }

  private handleLogin(user: User): void {
    this.setState({
      user: user,
      page: this.newMainComponent(user)
    });
  }

  private handleLogout(): void {
    let oldUserName: string = "";
    if (this.state.user) {
      oldUserName = this.state.user.name;
      this.state.user.logout();
    }
    this.setState(
      {
        user: null,
        page: this.newLoginComponent(null)
      }
    );
  }
}