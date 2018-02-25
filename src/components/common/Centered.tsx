import * as React from "react";

interface Props {
  maxWidth?: string;
}

export default class Centered extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div style={{
        display: "table",
        margin: "0px auto",
        maxWidth: this.props.maxWidth
      }}>
        {this.props.children}
      </div>
    );
  }
}