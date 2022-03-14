import { FC } from "react";

type AlertProps = { 
  children: string
}

export const Alert: FC<AlertProps> = ({ children }) => <div className="alert alert--warning">{children}</div>;
