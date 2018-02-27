import * as React from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "material-ui";
import InfoPopup from "../../common/InfoPopup";

import fixThis from "../../../util/FixThis";
import Price from "../../../model/lookup/Price";
import Model from "../../../model/lookup/ProductModel"
import ItemModel from "../../../model/cart/Item";
import ProductModel from "../../../model/lookup/ProductModel";
import User from "../../../model/User";
import { addToCart } from "../../../model/api/Cart";

interface Props {
  onLookup?: (model: string, type: string,
    onSuccess: (price: Price) => void,
    onFailure: (errMsg: string) => void
  ) => void;
  user: User;
  names?: Array<string>;
  title?: string;
}

interface State {
  model: string;
  name: string;

  result: Price | null;

  dialogOpen: boolean;
  dialogText: string;
  dialogType: "info" | "warning";
}

export default class Common extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> =
    {
      onLookup: (m, t) => null,
      names: new Array<string>(0),
      title: "",
    };

  public constructor(props: Props) {
    super(props);
    fixThis(this);
    this.setState = this.setState.bind(this);

    let defaultType: string = "";
    if (props.names && props.names.length > 0) {
      defaultType = props.names[0];
    }
    this.state =
      {
        model: "",
        name: defaultType,
        result: null,
        dialogOpen: false,
        dialogText: "",
        dialogType: "info"
      };
  }

  public render(): React.ReactNode {
    const typeSelector = this.props.names !== undefined &&
      this.props.names.length > 1 ? (
        <div>
          <FormControl> <InputLabel htmlFor="name">名称</InputLabel>
            <Select
              value={this.state.name}
              onChange={this.handleTypeSelection}
            >
              {this.props.names ? this.props.names.map(t => (
                <MenuItem value={t} key={t}>{t}</MenuItem>
              )) : null}
            </Select>
          </FormControl>
          <br />
        </div>
      ) : null;

    let result = <p>没有结果</p>;
    if (this.state.result) {
      result = (
        <p>
          不含税价：{this.state.result.priceWithoutTax} 万元 <br />
          含税价：{this.state.result.priceWithTax} 万元
        </p>
      );
    }

    return (
      <div>
        <Typography align="center" variant="headline">{this.props.title}</Typography>
        <div style={{
          display: "table",
          margin: "0 auto"
        }}>
          <form>
            {typeSelector}
            <TextField
              label="型号"
              helperText="格式仿照：ld5t-21m"
              margin="normal"
              onChange={this.handleModelChange}
              error={!this.isModelValid()}
            />
            <br />
            <Button
              variant="raised"
              color="primary"
              disabled={!this.isModelValid()}
              onClick={this.handleLookup}
              fullWidth
            >查询{this.isModelValid() ? null : "（条件非法）"}</Button>
          </form>
          {result}
          {this.state.result &&
            <Button
              variant="raised"
              color="secondary"
              fullWidth
              onClick={this.handleAddToCart}
            >
              加入购物车
            </Button>}
        </div>
        <InfoPopup
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
          text={this.state.dialogText}
          type="info"
        />
      </div>
    );
  }

  private isModelValid(): boolean {
    return Model.isValidStr(this.state.model);
  }

  private handleTypeSelection(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      name: event.target.value
    });
  }

  private handleModelChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      model: event.target.value
    });
  }

  private handleLookup(): void {
    if (this.props.onLookup) {
      // this.props.onLookup(this.state.model, this.state.type);
      this.props.onLookup(this.state.model, this.state.name,
        (price: Price) => {
          this.setState({
            result: price
          });
        },
        (errMsg: string) => {
          this.setState({
            result: null,
            dialogOpen: true,
            dialogText: errMsg,
            dialogType: "warning"
          });
        }
      );
    }
  }

  private handleAddToCart(): void {
    const modelStr = this.state.model;
    const name = this.state.name;

    const model = ProductModel.fromValidString(modelStr);
    const item = ItemModel.newItem("", name, model);
    if (this.props.user.token) {
      addToCart(this.props.user.token, item,
        (succeed: boolean) => {
          if (succeed) {
            this.setState({
              dialogOpen: true,
              dialogText: "成功加入购物车",
              dialogType: "info"
            });
          } else {
            this.setState({
              dialogOpen: true,
              dialogText: "添加失败",
              dialogType: "warning"
            });
          }
        });
    }
  }

}