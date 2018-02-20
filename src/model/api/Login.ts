import jQuery from "jquery";
import { apiBaseUrl } from "./ApiBase";

export interface Credential {
  name: string;
  password: string;
}

export class Token {
  public constructor(token: string) {
    this.token_ = token;
  }

  private token_: string;
  public get token(): string { return this.token_; }
}

export function login(
  account: Credential,
  onSuccess: (token: Token) => void = () => { },
  onFailure: (errMsg: string) => void = () => { }
): void {
  jQuery.ajax({
    url: apiBaseUrl + "/user/login",
    dataType: "json",
    type: "POST",
    data: account
  }).done(response => {
    if (response.succeed)
      onSuccess(new Token(response.MsgCode));
    else
      onFailure(response.MsgCode);
  }).fail((xhr, status, error) => {
    onFailure("网络错误");
  });
}