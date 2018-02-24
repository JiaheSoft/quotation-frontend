import * as React from "react";
import {
  Typography
} from "material-ui";

import fixThis from "../../../util/FixThis";

import Price from "../../../model/lookup/Price";
import Model from "../../../model/lookup/ProductModel"

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "material-ui";

interface Props {
  onLookup?: (model: string, type: string,
    onSuccess: (price: Price) => void,
    onFailure: (errMsg: string) => void
  ) => void;
  types?: Array<string>;
  title?: string;
}

interface State {
  model: string;
  type: string;

  result: Price | null;
}

export default class Common extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> =
    {
      onLookup: (m, t) => null,
      types: new Array<string>(0),
      title: "",
    };

  public constructor(props: Props) {
    super(props);
    fixThis(this);
    this.setState = this.setState.bind(this);

    let defaultType: string = "";
    if (props.types && props.types.length > 0) {
      defaultType = props.types[0];
    }
    this.state =
      {
        model: "",
        type: defaultType,
        result: null
      };
  }

  public render(): React.ReactNode {
    const typeSelector = this.props.types !== undefined &&
      this.props.types.length !== 0 ? (
        <div>
          <FormControl> <InputLabel htmlFor="type">类别</InputLabel>
            <Select
              value={this.state.type}
              onChange={this.handleTypeSelection}
            >
              {this.props.types ? this.props.types.map(t => (
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
        </div>
      </div>
    );
  }

  private isModelValid(): boolean {
    return Model.isValidStr(this.state.model);
  }

  private handleTypeSelection(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      type: event.target.value
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
      this.props.onLookup(this.state.model, this.state.type,
        (price: Price) => {
          this.setState({
            result: price
          });
        },
        (errMsg: string) => {
          // TODO show error message
          this.setState({
            result: null
          });
        }
      );
    }
  }
}