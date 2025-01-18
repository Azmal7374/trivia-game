/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import Navbar from "@/components/Share/Navbar/Navabr";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Navbar/>
        <div className="">{children}</div>
      </div>
      <div >
        <h1>Footer</h1>
      </div>
    </>
  );
};

export default layout;