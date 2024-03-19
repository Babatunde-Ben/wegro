/// <reference types="vite/client" />
declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;

  export default ReactComponent;
}
type Navlinks = {
  id: number;
  path: string;
  name: string;
  svg?: React.ReactNode;
}[];
type UserData = {
  display_name: string | null;
  profile_photo: string | null;
};
