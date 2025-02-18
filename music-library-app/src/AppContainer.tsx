import React from "react";

function AppContainer({ children }: { children: React.ReactElement }) {
  return (
    <div className=" h-full bg-[#f5f8fb]" data-testid="app-container">
      {children}
    </div>
  );
}

export default AppContainer;
