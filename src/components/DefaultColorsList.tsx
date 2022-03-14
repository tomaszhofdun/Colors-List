import { FC } from "react";
import { ColorType } from "./types/ColorTypes";

type ColorsProps = {
  defaultColors: ColorType[];
};

export const DefaultColorsList: FC<ColorsProps> = ({defaultColors}) => {

  const sortedColors = [...defaultColors]

  sortedColors.sort(function (a, b) {
    return b.red - a.red || a.green - b.green;
  });

  return (
    <>
      <h3 className="color-list__header">Default Colors - not removable</h3>
      <div className="color-list__defaults">
        {sortedColors.map((color) => (
          <div key={color.id} className="color-list__container">
            <svg className="color-list__color">
              <rect className="color-list__color" fill={color.hex} />
            </svg>
            <p className="color-list__name">{color.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};
