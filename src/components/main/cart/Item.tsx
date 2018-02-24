import * as React from "react";

import fixThis from "../../../util/FixThis";
import ItemModel from "../../../model/cart/Item";

interface Props {
  item: ItemModel;
}

export default class Item extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  public render(): React.ReactNode {
    return (
      <div>
        
      </div>
    );
  }
}