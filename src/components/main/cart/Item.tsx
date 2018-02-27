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
    return `${item.name}（${item.model.modelStr}）`;
  }

  public render(): React.ReactNode {
    return (<>
      <ListItem disableGutters>
        <IconButton onClick={this.props.onDecrease}
          disabled={this.props.item.count <= 1}
        > <RemoveCircleOutline />
        </IconButton>
        <Typography variant="body2">
          {this.props.item.count}
        </Typography>
        <IconButton onClick={this.props.onIncrease}>
          <AddCircleOutline />
        </IconButton>
        <Typography variant="body2">
          {this.itemString()}
        </Typography>

        <Space />
        <IconButton onClick={this.props.onRemove}>
          <Clear />
        </IconButton>
      </ListItem>
    </>);
  }
}