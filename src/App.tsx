import { useEffect } from "react";
import "./styles/App.scss";
import { ColorList } from "./components/ColorList";
import { useState } from "react";
import { ColorType } from "./components/types/ColorTypes";
import { ErrorType } from "./components/types/ErrorTypes";
import { AddColorForm } from "./components/AddColorForm";
import { ColorErrors } from "./components/constants/ColorErrors";
import { Alert } from "./components/Alert";

const App = () => {
  useEffect(() => {
    document.title = `Color App`;
  }, []);

  type Colors = ColorType[]
  type Errors = ErrorType[]

  
  const [colors, setColors] = useState<Colors>([])
  const [errors, setErrors] = useState<Errors>(ColorErrors)

 useEffect(() => {
  const storedColors = localStorage.getItem("colors")
  if(storedColors) setColors(JSON.parse(storedColors))
}, [])


  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors))
  },[colors])

  
  return (
    <div className="App">
      {errors.map((error, index) => error.active == true && <Alert key={index} message={error.message}/>)}
      <AddColorForm setColors={setColors} setErrors={setErrors} errors={errors}/>
      {/* <ColorFilter /> */}
      <ColorList colors={colors} setColors={setColors}/>
    </div>
  );
};

export default App;
