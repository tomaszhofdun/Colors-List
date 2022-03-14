import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FC } from "react";
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

export const ColorList: FC<ColorsProps> = ({colors, setColors, filteredColors}) => {
  return (
    <div className="color-list">
      <DefaultColorsList defaultColors={defaultColors} />
      <UserColorsList colors={colors} setColors={setColors} filteredColors={filteredColors}/>
    </div>
  );
};
