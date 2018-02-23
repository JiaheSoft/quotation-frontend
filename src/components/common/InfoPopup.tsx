import React from "react";
import fixThis from "../../util/FixThis";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "material-ui";

import red from "material-ui/colors/red";

interface Props {
  open: boolean;
  onClose: () => void;
  text: string;
  type: "info" | "warning";
}

export default class InfoPopup extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);
  }

  private textStyle(): React.CSSProperties {
    const type = this.props.type;
    if (type === "warning") {
      return { color: red[500] };
    } else {
      return {};
    }
  }

  public render(): React.ReactNode {
    return (
      <Dialog open={this.props.open}>
        <DialogContent>
          <DialogContentText style={this.textStyle()}>
            {this.props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="raised"
            color="primary"
            onClick={this.props.onClose}
          >好的</Button>
        </DialogActions>
      </Dialog>
    );
  }
}