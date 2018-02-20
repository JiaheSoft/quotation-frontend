import * as React from "react";
import { Reboot } from "material-ui";

import Login from "./Login";
import TopBar from "./TopBar";
import Main from "./Main";
import fixThis from "../util/FixThis";
import User from "../model/User";

import { MuiThemeProvider } from "material-ui/styles";
import { theme } from "./Theme";

interface AppState {
  user: User | null;
  page: JSX.Element;
}

export default class App extends React.Component<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    fixThis(this);

    this.state = {
      user: User.load(),
      page: <div></div>
    };
  }

  public componentDidMount() {
    this.setState({
      page: this.loginComp()
    });
  }

  private loginComp(): JSX.Element {
    return <Login
      onLogin={this.handleLogin}
      defaultUser={this.state.user ? this.state.user : undefined}
    />;
  }
  private mainComp(): JSX.Element {
    return <Main ref={main => this.main = main} />;
  }

  private main: Main | null = null;

  public render(): React.ReactNode {
    return (
      <div>
        <Reboot />
        <MuiThemeProvider theme={theme}>
          <TopBar
            onLogout={this.handleLogout}
            user={this.state.user}
            onReturnHome={this.handleReturnHome}
          />
          {this.state.page}
        </MuiThemeProvider>
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
    this.setState(
      { user: null },
      () => this.setState({ page: this.loginComp() })
    );
  }

  private handleReturnHome(): void {
    if (this.main) {
      this.main.backToHome();
    }
  }
}