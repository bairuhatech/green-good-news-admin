import React from "react";
import { IconType } from "react-icons";
import { CgUnavailable } from "react-icons/cg";
import { SlHome } from "react-icons/sl";
import { RxSpeakerLoud } from "react-icons/rx";
import { BiMoviePlay } from "react-icons/bi";
import { MdLiveTv } from "react-icons/md";
import { IoFootballOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

function DynamicIcon(props: any) {
  type IconName =
    | "IoFootballOutline"
    | "BiMoviePlay"
    | "CgUnavailable"
    | "SlHome"
    | "RxSpeakerLoud"
    | "MdLiveTv"
    | "RiLogoutCircleRLine";

  interface IconProps {
    iconName: IconName;
    size?: number;
    color?: string;
  }

  function Icon({ iconName, size = 26, color = "red" }: IconProps) {
    const icons: Record<IconName, IconType> = {
      IoFootballOutline: IoFootballOutline,
      CgUnavailable: CgUnavailable,
      SlHome: SlHome,
      RxSpeakerLoud: RxSpeakerLoud,
      BiMoviePlay: BiMoviePlay,
      MdLiveTv: MdLiveTv,
      RiLogoutCircleRLine: RiLogoutCircleRLine,
    };

    if (!icons.hasOwnProperty(iconName)) {
      console.warn(
        `Icon '${iconName}' not found. Rendering default icon instead.`
      );
      iconName = "CgUnavailable"; // set default icon name
    }

    const IconComponent = icons[iconName];

    return <IconComponent size={size} color={props.color} />;
  }

  return <Icon iconName={props.name} size={props.size} />;
}
export default DynamicIcon;
