import React from "react";

function AppContainer({ children }: { children: React.ReactElement }) {
  return <div className=" h-full bg-[#f5f8fb]">{children}</div>;
}

export default AppContainer;
