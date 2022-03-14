import { SetStateAction } from "react";
import { Component } from "react";
import { Dispatch } from "react";
import { defaultColors } from "./constants/DefaultColors";
import { DefaultColorsList } from "./DefaultColorsList";
import { ColorType } from "./types/ColorTypes";
import { UserColorsList } from "./UserColorsList";

type ColorsTable = ColorType[];

type ColorsProps = {
  colors: ColorType[],
  setColors: Dispatch<SetStateAction<ColorsTable>>,
  filteredColors: ColorType[]
}

export class ColorList extends Component<ColorsProps>  {
  render() {
    return (
      <div className="color-list">
      <DefaultColorsList defaultColors={defaultColors} />
      <UserColorsList colors={this.props.colors} setColors={this.props.setColors} filteredColors={this.props.filteredColors}/>
    </div>
    )
  }
};
