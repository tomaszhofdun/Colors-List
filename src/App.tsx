import { useEffect } from "react";
import "./styles/App.scss";
import { ColorList } from "./components/ColorList";
import { useState } from "react";
import { ColorType } from "./components/types/ColorTypes";
import { ErrorType } from "./components/types/ErrorTypes";
import { AddColorForm } from "./components/AddColorForm";
import { ColorErrors } from "./components/constants/ColorErrors";
import { Alert } from "./components/utils/Alert";
import { ColorFilter } from "./components/ColorFilter";

const App = () => {
  useEffect(() => {
    document.title = `Color App`;
  }, []);

  type Colors = ColorType[];
  type Errors = ErrorType[];

  const [colors, setColors] = useState<Colors>([]);
  const [filteredColors, setFilteredColors] = useState<Colors>([]);
  const [errors, setErrors] = useState<Errors>(ColorErrors);

  useEffect(() => {
    const storedColors = localStorage.getItem("colors");
    if (storedColors) setColors(JSON.parse(storedColors));
    if (storedColors) setFilteredColors(JSON.parse(storedColors));
  }, []);

  return (
    <div className="App">
      {errors.map(
        (error, index) => error.active === true && <Alert key={index}>{error.message}</Alert>
      )}
      <AddColorForm setColors={setColors} setFilteredColors={setFilteredColors} setErrors={setErrors} errors={errors} />
      <ColorFilter colors={colors} setColors={setColors} setFilteredColors={setFilteredColors} />
      <ColorList colors={colors} setColors={setColors} filteredColors={filteredColors} />
    </div>
  );
};

export default App;
