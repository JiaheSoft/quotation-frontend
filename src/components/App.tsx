import * as React from "react";
import { Reboot } from "material-ui";

import Login from "./Login";
import TopBar from "./TopBar";
import Main from "./Main";
import fixThis from "../util/FixThis";
import User from "../model/User";

interface AppState {
  user: User | null;
  page: JSX.Element;
}

export default class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    fixThis(this);

    this.initState();
  }

  private initState(): void {
    let user = User.load();
    this.state =
      {
        user: user,
        page: user === null ? this.loginComp() : this.mainComp()
      };
  }

  private loginComp(): JSX.Element {
    return <Login onLogin={this.handleLogin} />;
  }
  private mainComp(): JSX.Element {
    return <Main />;
  }  

  public render(): React.ReactNode {
    return (
      <div>
        <Reboot />
        <TopBar
          onLogout={this.handleLogout}
          user={this.state.user}
        />
        {this.state.page}
      </div>
    );
  }

  private handleLogin(user: User | null): void {
    this.setState({
      user: user,
      page: this.mainComp()
    });
  }

  private handleLogout(): void {
    if (this.state.user)
      this.state.user.logout();
    this.setState({
      user: null,
      page: this.loginComp()
    });
  }

  private handleReturnHome(): void {
    if (this.state.user) {
      this.setState(
        { page: this.mainComp() }
      );
    } else {
      this.setState(
        { page: this.loginComp() }
      );
    }
  }
}