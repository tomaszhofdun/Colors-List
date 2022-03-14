import { Dispatch, useState, ChangeEvent, FormEvent, SetStateAction, FC } from "react";
import { hexToHsl, hexToRgb, hexValidate } from "./helpers/color.helper";
import { ColorType } from "./types/ColorTypes";
import { ErrorType } from "./types/ErrorTypes";

type Colors = ColorType[];
type Errors = ErrorType[];

type AllProps = {
  setColors: Dispatch<SetStateAction<Colors>>;
  setFilteredColors: Dispatch<SetStateAction<Colors>>;
  setErrors: Dispatch<SetStateAction<Errors>>;
  errors: Errors;
};

export const AddColorForm: FC<AllProps> = ({ setColors, setErrors, errors }) => {
  const [hex, setHex] = useState<string>("#FFFFFF");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmitForm = (e: FormEvent): void => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 300)

    const rgb = hexToRgb(hex);
    const hsl = hexToHsl(hex);

    setColors((prev: Colors) => {
      const id: number = Math.random() * new Date().getMilliseconds();
      const sortColors = [
        ...prev,
        {
          id: id,
          name: hex,
          hex: hex,
          red: rgb.r,
          green: rgb.g,
          blue: rgb.b,
          hue: hsl.hue,
          saturation: hsl.sat,
          lightness: hsl.light,
        },
      ];

      sortColors.sort(function (a, b) {
        return b.red - a.red || a.green - b.green;
      });

      localStorage.setItem("colors", JSON.stringify(sortColors))
      return sortColors;
    });
  };


  const handleErrors = (correct: boolean): void => {
    const copyErrors = [...errors];

    if (!correct) {
      for (const error of copyErrors) {
        if (error.name === "warning") {
          error.active = true;
        }
      }
    } else {
      copyErrors.forEach((error) => {
        error.active = false;
      });
    }
    setErrors(copyErrors);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHex(e.target.value.toUpperCase());
    const correct: boolean = hexValidate(e.target.value);
    setIsFormValid(correct);
    handleErrors(correct)
  };

  return (
    <form className="color-form" onSubmit={handleSubmitForm}>
      <input onChange={handleChange} className="color-form__hex" type="text" id="color" value={hex} />
      <button disabled={!isFormValid || isSaving} className="color-form__button"> Add to list </button>
    </form>
  );
};
