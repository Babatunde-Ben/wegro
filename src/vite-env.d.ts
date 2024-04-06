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

type TracksData = {
  data?: {
    tracks?: {
      preview_url?: string;
      artists?: { name: string }[];
      name?: string;
      id?: string;
      album?: {
        images?: { url: string }[];
      };
    }[];
  };
};
type TracksSearch = {
  data?: {
    id?: string;
    name?: string;
    artists?: { items: { profile: { name: string } }[] };
    albumOfTrack?: {
      coverArt?: { sources: { url: string }[] };
    };
    tracks?: {
      preview_url?: string;
    }[];
  };
};
