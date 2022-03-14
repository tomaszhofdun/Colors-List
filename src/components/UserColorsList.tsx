import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FC } from "react";
import { ColorType } from "./types/ColorTypes";

type ColorsTable = ColorType[];

type ColorsProps = {
  colors: ColorType[],
  setColors: Dispatch<SetStateAction<ColorsTable>>,
  filteredColors: ColorType[]
};

export const UserColorsList: FC<ColorsProps> = ({ colors, setColors, filteredColors }) => {

const handleDelete = (id: number):void => {
  let col = colors.filter(col => col.id !== id)
  localStorage.setItem("colors", JSON.stringify(col))
  setColors(col)
}

  return (
    <>
      <h3 className="color-list__header">User's Colors - feel free to add and remove as you wish</h3>
      <div className="color-list__user">
        {filteredColors.length ? filteredColors.map((color) => (
          <div key={color.id} className="color-list__container">
            <svg className="color-list__color">
              <rect className="color-list__color" fill={color.hex} />
            </svg>
            <p className="color-list__name">{color.name}</p>
            <button onClick={() => handleDelete(color.id)} className="color-list__remove">Remove</button>
          </div>
        )) : <span className="color-list__alert alert alert--info">Sorry, you haven't added any color yet or no results for this filter</span>}
      </div>
    </>
  );
};
