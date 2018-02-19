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
const icon_1 = require("../resources/01.svg");
const icon_2 = require("../resources/02.svg");
const icon_3 = require("../resources/03.svg");
const icon_4 = require("../resources/04.svg");

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
          icon: icon_2,
          target: <DanLiang />
        },
        {
          title: "双梁",
          icon: icon_1,
          target: <ShuangLiang />
        },
        {
          title: "葫芦",
          icon: icon_3,
          target: <Hulu />
        },
        {
          title: "非标询价",
          icon: icon_4,
          target: <Custom />
        }
      ];
    return (
      <div style={{ flexGrow: 1 }}>
        <GridList cols={2} style={{ margin: "0.5em" }}>
          {pages.map(pg => (
            <GridListTile
              onClick={() => this.handleOpenLink(pg.target)}
              key={pg.title}
              style={{ padding: "1em" }}
            >
              <img src={pg.icon}
                style={
                  {
                    width: "100%",
                    height: "100%",
                    color: "#757ce8"
                  }
                } />
              <GridListTileBar
                title={
                  <div style={{ width: "100%", textAlign: "center" }}>
                    {pg.title}
                  </div>
                }
                style={{ backgroundColor: "black", opacity: 0.7 }}
              />
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
