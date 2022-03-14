import { FC } from "react";
import { SetStateAction } from "react";
import { useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Colors } from "./constants/Colors";
import { ColorType } from "./types/ColorTypes";

type ColorsProps = {
  colors: ColorType[];
  setColors: Dispatch<SetStateAction<ColorType[]>>;
  setFilteredColors: Dispatch<SetStateAction<ColorType[]>>;
};

type ActiveFilterType = { [key: string]: number }
type FilterType = {
  name: string,
  value: number,
  active: boolean
}

export const ColorFilter: FC<ColorsProps> = ({ colors, setFilteredColors }) => {

  const filters: FilterType[] = [
    { name: Colors.RED, value: 125, active: false },
    { name: Colors.GREEN, value: 125, active: false },
    { name: Colors.BLUE, value: 125, active: false },
    { name: Colors.SATURATION, value: 50, active: false },
  ]

  const [filterQueries, setFilterQueries] = useState<FilterType[]>(filters)

  // Filter again when new color is created
  useEffect(() => {
    filterColors()
  }, [colors])

  const setActiveFilters = ():ActiveFilterType => {
    let activeFilters: ActiveFilterType = {}
    for (const filter of filterQueries) {
      if (filter.active) activeFilters = { ...activeFilters, [filter.name]: filter.value }
    }
    return activeFilters
  }

  const filterColors = (): void => {

    const activeFilters = setActiveFilters()

    // Filter colors using active filters
    const filteredColors = colors.filter(
      (item: { [key: string]: any }) => {
        return Object.keys(activeFilters).every((key) => {
          return item[key] >= activeFilters[key];
        });
      }
    );
    
    setFilteredColors(filteredColors);
  }

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {

    const name = event.target.value
    const filtersList = [...filterQueries]

    for (const el of filtersList) {
      if (el.name === name) el.active = !el.active
    }
    
    setFilterQueries(filtersList)
    filterColors()
  };

  return (
    <form className="filter-form">
      <input onChange={handleChangeValue} type="checkbox" id="red" name="red" value="red" />
      <label htmlFor="red"> Red {">"} 50%</label>
      <input onChange={handleChangeValue} type="checkbox" id="green" name="green" value="green" />
      <label htmlFor="green"> Green {">"} 50%</label>
      <input onChange={handleChangeValue} type="checkbox" id="blue" name="blue" value="blue" />
      <label htmlFor="blue"> Blue {">"} 50%</label>
      <input onChange={handleChangeValue} type="checkbox" id="saturation" name="saturation" value="saturation" />
      <label htmlFor="saturation"> Saturation {">"} 50%</label>
    </form>
  );
};
