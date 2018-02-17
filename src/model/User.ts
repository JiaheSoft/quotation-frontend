import { FromJSON, ToJSON } from "../util/JSON";

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
      if (user.fromJSON(lastUserJSON) && user.login()) {
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
  public login(): boolean {
    // TODO calls web api to login.
    return this.name_ === "admin" && this.password_ === "pwd";
  }
}