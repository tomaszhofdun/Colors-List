import { Dispatch } from "react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { FormEvent } from "react";
import { SetStateAction } from "react";
import { FC } from "react";
import { hexToHsl, hexToRgb, hexValidate } from "./helpers/color.helper";
import { ColorType } from "./types/ColorTypes";
import { ErrorType } from "./types/ErrorTypes";

type Colors = ColorType[];
type Errors = ErrorType[];

type AllProps = {
  setColors: Dispatch<SetStateAction<Colors>>;
  setErrors: Dispatch<SetStateAction<Errors>>;
  errors: Errors;
};

export const AddColorForm: FC<AllProps> = ({
  setColors,
  setErrors,
  errors,
}) => {
  const [hex, setHex] = useState<string>("#FFFFFF");
  const [isValid, setIsValid] = useState<boolean>(true);
  

  const handleSubmitForm = (e: FormEvent): void => {
    e.preventDefault();
    if(!isValid) return

    const rgb = hexToRgb(hex)
    const hsl = hexToHsl(hex)

    setColors((prev) => {
      const id: number = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [
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
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHex(e.target.value.toUpperCase());

    const correct = hexValidate(e.target.value);
    setIsValid(correct)

    const copyErrors = [...errors];

    if (!correct) {
      copyErrors.forEach((error) => {
        if (error.name == "warning") {
          error.active = true;
        }
      });
    } else {
      copyErrors.forEach((error) => {
        error.active = false;
      });
    }

    setErrors(copyErrors);

  };

  return (
    <form className="color-form" onSubmit={handleSubmitForm}>
      <input
        onChange={handleChange}
        className="color-form__hex"
        type="text"
        id="color"
        value={hex}
      />
      <button disabled={!isValid} className="color-form__button">Wyślij</button>
    </form>
  );
};
