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
import TopBar from "../topbar/TopBar";

import User from "../../model/User";
import fixThis from "../../util/FixThis";

import IconDone from "material-ui-icons/Done";
import IconDoneAll from "material-ui-icons/DoneAll";
import IconGroupWork from "material-ui-icons/GroupWork";
import IconCustom from "material-ui-icons/YoutubeSearchedFor";
const icon_1: string = require("../../resources/01.svg");
const icon_2: string = require("../../resources/02.svg");
const icon_3: string = require("../../resources/03.svg");
const icon_4: string = require("../../resources/04.svg");

interface Props {
  user: User;
  onLogout: () => void;
}

interface MainState {
  page?: React.ReactNode;
}

export default class Shopping extends React.Component<Props, MainState> {
  public constructor(props: Props) {
    super(props);
    fixThis(this);

    this.state = {
      page: this.homePage()
    }
  }

  private backToHome(): void {
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
          target: <DanLiang user={this.props.user} />
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
      <div>
        {this.newTopBar()}
        <div style={{ flexGrow: 1 }}>
          <GridList cols={2} style={{ marginLeft: "1em", marginRight: "1em" }}>
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
      </div>);
  }

  public render(): React.ReactNode {
    return (<>
      {this.state.page}
    </>);
  }

  private handleOpenLink(target: React.ReactNode)
    : void {
    const decoratedTarget = (<>
      {this.newTopBar()}
      {target}
    </>);
    this.setState({
      page: decoratedTarget
    });
  }

  private newTopBar(): React.ReactNode {
    return (
      <TopBar user={this.props.user}
        onLogout={this.props.onLogout}
        onReturn={this.backToHome}
      />
    );
  }
}
