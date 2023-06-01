import { MouseEvent, ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
};

const AppIcon = ({ className, children, onClick }: Props) => {
  return (
    <i
      onClick={onClick}
      className={"flex items-center justify-center " + className}
    >
      {children}
    </i>
  );
};

export default AppIcon;
