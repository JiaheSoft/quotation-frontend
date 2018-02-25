import * as React from "react";
import Space from "../../common/Space";
import {
  ListItem,
  IconButton,
  Icon,
  Typography,
  Checkbox,
  TextField
} from "material-ui";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  Clear
} from "material-ui-icons";

import fixThis from "../../../util/FixThis";
import ItemModel from "../../../model/cart/Item";

interface Props {
  item: ItemModel;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default class Item extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  private itemString(): string {
    const item = this.props.item;
    return `${item.type}(${item.model})`;
  }

  public render(): React.ReactNode {
    return (
      <ListItem key={this.itemString()}>
        <IconButton onClick={this.props.onIncrease}>
          <AddCircleOutline />
        </IconButton>
        <TextField
          value={this.props.item.count}
          disabled
          style={{ width: "3em" }}
        />
        <IconButton onClick={this.props.onDecrease}>
          <RemoveCircleOutline />
        </IconButton>
        <Typography variant="body1">
          {this.itemString()}
        </Typography>

        <Space />
        <IconButton onClick={this.props.onRemove}>
          <Clear />
        </IconButton>
      </ListItem>
    );
  }
}