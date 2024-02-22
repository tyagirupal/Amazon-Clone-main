import { Outlet } from "react-router-dom";
import { Header } from "@src/components/Header";

export function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
