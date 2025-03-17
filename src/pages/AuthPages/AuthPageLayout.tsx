import React from "react";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {/* <div className="relative items-center hidden w-full h-full lg:w-1/6 bg-gray-50 dark:bg-white/5 lg:grid"> */}
        {/* <div className="relative flex items-center justify-center z-1"> */}
        {/* <!-- ===== Common Grid Shape Start ===== --> */}
        {/* <div className="flex flex-col items-center max-w-xs mb-20"> */}
        <GridShape />

        {/* <Link to="/" className="block ">
                <img
                  width={150}
                  height="auto"
                  src="/images/logo/logo.svg"
                  alt="Logo"
                />
              </Link> */}
        {/* </div> */}
        {/* </div> */}

        {/* <img
            src="/images/auth/tower.svg"
            alt="Background SVG"
            className="absolute bottom-0 left-0 w-90 h-auto"
          /> */}
        {/* </div> */}
        {children}
        <GridShape />

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
