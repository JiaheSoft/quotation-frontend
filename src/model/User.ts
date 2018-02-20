import { FromJSON, ToJSON } from "../util/JSON";
import {
  login as loginAsync,
  Token
} from "./api/Login";

export default class User implements FromJSON, ToJSON {
  public constructor(name?: string, password?: string) {
    if (name)
      this.name = name;
    if (password)
      this.password = password;
  }

  private name_: string = "";
  get name() { return this.name_; }
  set name(name: string) { this.name_ = name; }

  private password_: string = "";
  get password() { return this.password_; }
  set password(password: string) { this.password_ = password; }

  private token_: Token | null = null;
  public get token() { return this.token_; }

  toJSON(): string {
    return JSON.stringify({
      name: this.name,
      password: this.password
    });
  }
  fromJSON(json: string): boolean {
    try {
      let jsonObj: any = JSON.parse(json);
      if ("name" in jsonObj && "password" in jsonObj) {
        this.name = jsonObj.name;
        this.password = jsonObj.password;
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  public static load(): User | null {
    let lastUserJSON: string | null = localStorage.getItem("user");
    if (lastUserJSON === null) {
      return null;
    } else {
      let user: User = new User();
      if (user.fromJSON(lastUserJSON)) {
        return user;
      } else {
        return null;
      }
    }
  }

  public save(): void {
    localStorage.setItem("user", this.toJSON());
  }

  public logout(): void {
    localStorage.removeItem("user");
  }

  /**
   * Try login with current username and password.
   * If the credential is correct, we setup other fields
   * such as role
   * @returns whether the login succeeded
   */
  public loginAsync(
    onSuccess?: () => void,
    onFailure?: (errMsg: string) => void
  ) {
    loginAsync(
      {
        name: this.name,
        password: this.password
      },
      (token: Token) => {
        this.token_ = token;
        if (onSuccess)
          onSuccess();
      },
      (errMsg: string) => {
        if (onFailure)
          onFailure(errMsg);
      }
    );
  }
}