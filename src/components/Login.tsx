import * as React from "react";
import {
  TextField,
  Button,
  Checkbox,
  InputLabel,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui";
import TopBar from "./topbar/TopBar";

import fixThis from "../util/FixThis";
import User from "../model/User";

import red from "material-ui/colors/red";
import styled from "styled-components";

interface LoginProps {
  onLogin?: (user: User) => void;
  defaultUser?: User;
}

interface LoginState {
  username: string,
  password: string,
  rememberPass: boolean,

  dialogOpen: boolean,
  dialogMessage: string,
  failed: boolean,
}

class Login extends React.Component<LoginProps, LoginState> {
  public constructor(props: LoginProps) {
    super(props);
    fixThis(this);
    this.setState = this.setState.bind(this);

    this.state = {
      username: "",
      password: "",
      rememberPass: true,
      dialogOpen: false,
      dialogMessage: "用户名或密码错误",
      failed: false
    };
  }

  public componentDidMount() {
    let user = this.props.defaultUser;
    if (user) {
      let username = user.name;
      let password = user.password;
      this.setState(
        {
          username,
          password
        },
        () => this.handleLogin()
      );
    }
  }

  public render(): React.ReactNode {
    return (<>
      <TopBar />
      <div style={{
        display: "table",
        margin: "0 auto"
      }}>
        <form>
          <TextField
            value={this.state.username}
            id="username"
            label="用户名"
            type="text"
            margin="dense"
            onChange={this.handleUserNameChange}
          />
          <br />
          <TextField
            value={this.state.password}
            error={this.state.failed}
            id="password"
            label="密码"
            type="password"
            margin="dense"
            onChange={this.handlePasswordChange}
          />
          <br />
          <InputLabel>记住密码</InputLabel>
          <Checkbox onChange={this.handleRemPwdChange} checked={this.state.rememberPass} />
        </form>
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleLogin}
          disabled={!this.state.username}
          fullWidth
        >登录</Button>

        <Dialog
          open={this.state.dialogOpen}>
          <DialogContent>
            <DialogContentText style={{ color: red[500] }}>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" color="primary" onClick={this.handleCloseDialog}>好的</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>);
  }

  private handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newName = e.target.value;
    this.setState({ username: newName });
  }

  private handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newPwd = e.target.value;
    this.setState({ password: newPwd });
  }

  private handleRemPwdChange(
    e: React.ChangeEvent<HTMLInputElement>
    , checked: boolean): void {
    this.setState({ rememberPass: checked });
  }

  private handleLogin(): void {
    let username: string = this.state.username;
    let password: string = this.state.password;

    let user: User = new User(username, password);
    user.loginAsync(
      () => {
        if (this.state.rememberPass) {
          user.save();
        }
        this.setState({
          failed: false
        });
        if (this.props.onLogin) {
          this.props.onLogin(user);
        }
      },
      (errMsg: string) => {
        this.setState({
          password: "",
          failed: true,
          dialogMessage: errMsg,
          dialogOpen: true
        });
      }
    );
  }

  private handleCloseDialog(event: React.MouseEvent<HTMLInputElement>): void {
    this.setState({
      dialogOpen: false
    });
  }
}

export default Login;
