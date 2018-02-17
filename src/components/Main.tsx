import * as React from "react";
import {
  Grid,
  Button
} from "material-ui";
import fixThis from "../util/FixThis";

interface MainState {
  page?: JSX.Element;
}

export default class Main extends React.Component<{}, MainState> {
  public constructor(props: {}) {
    super(props);
    fixThis(this);

    this.state = {
      page: this.homePage()
    }
  }

  private homePage(): JSX.Element {
    const pages =
      {
        danLiang: <p>单梁</p>,
        shuangLiang: <p>双梁</p>,
        hulu: <p>葫芦</p>,
        custom: <p>非标</p>
      };
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Link text="单梁" target={pages.danLiang} />
          </Grid>
          <Grid item xs={4}>
            <Link text="双梁" target={pages.shuangLiang} />
          </Grid>
          <Grid item xs={4}>
            <Link text="葫芦" target={pages.hulu} />
          </Grid>
          <Grid item xs={12}>
            <Link text="非标询价" target={pages.custom} />
          </Grid>
        </Grid>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div style={{margin: "0.5em"}}>
        {this.state.page}
      </div>
    );
  }
}

interface LinkProps {
  text: string,
  target: JSX.Element
}

class Link extends React.Component<LinkProps> {
  public constructor(props: LinkProps) {
    super(props);
    fixThis(this);
  }

  public render(): React.ReactNode {
    return (
      <Button
        variant="raised"
        color="secondary"
        onClick={() => { }}
        fullWidth
      >{this.props.text}
      </Button>
    );
  }
}
