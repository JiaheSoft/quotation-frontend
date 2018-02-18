import * as React from "react";
import {
  SvgIcon,
  GridList,
  GridListTile,
  GridListTileBar
} from "material-ui";
import DanLiang from "./lookup/DanLiang";
import ShuangLiang from "./lookup/ShuangLiang";
import Hulu from "./lookup/Hulu";
import Custom from "./lookup/Custom";

import fixThis from "../util/FixThis";

import IconDone from "material-ui-icons/Done";
import IconDoneAll from "material-ui-icons/DoneAll";
import IconGroupWork from "material-ui-icons/GroupWork";
import IconCustom from "material-ui-icons/YoutubeSearchedFor";

interface MainState {
  page?: React.ReactNode;
}

export default class Main extends React.Component<{}, MainState> {
  public constructor(props: {}) {
    super(props);
    fixThis(this);

    this.state = {
      page: this.homePage()
    }
  }

  public backToHome(): void {
    this.setState(
      { page: this.homePage() }
    )
  }

  private homePage(): React.ReactNode {
    const pages =
      [
        {
          title: "单梁",
          icon: <IconDone />,
          target: <DanLiang />
        },
        {
          title: "双梁",
          icon: <IconDoneAll />,
          target: <ShuangLiang />
        },
        {
          title: "葫芦",
          icon: <IconGroupWork />,
          target: <Hulu />
        },
        {
          title: "非标询价",
          icon: <IconCustom />,
          target: <Custom />
        }
      ];
    return (
      <div style={{ flexGrow: 1 }}>
        <GridList>
          {pages.map(pg => (
            <GridListTile onClick={() => this.handleOpenLink(pg.target)} key={pg.title}>
              <SvgIcon
                style={{ width: "100%", height: "100%", color: "#757ce8" }}
              > {pg.icon}
              </SvgIcon>
              <GridListTileBar title={pg.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

  public render(): React.ReactNode {
    return (
      <div style={{ margin: "0.5em" }}>
        {this.state.page}
      </div>
    );
  }

  private handleOpenLink(target: React.ReactNode)
    : void {
    this.setState({ page: target });
  }
}
