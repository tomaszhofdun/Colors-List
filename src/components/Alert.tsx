import { FC } from "react";

type AlertProps = { 
  message: string
}

export const Alert: FC<AlertProps> = ({ message }) => <div className="alert alert--warning">{message}</div>;
