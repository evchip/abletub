import React from "react";
import Banner from "./Banner";
import NavBar from "./NavBar";
import { Wrapper, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {

  return (
    <>
      <Banner />
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
