import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function AutoRickshawIcon({ size = 36, color = "#071827", style }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={style}>
      <Path
        d="M8 44c0-8 6-20 20-20h8c10 0 16 8 16 16v8c0 2-2 4-4 4H12c-2 0-4-2-4-4v-4z"
        fill={color}
        stroke="#222"
        strokeWidth={2}
      />
      <Path
        d="M16 44a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm32 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
        fill="#FFD600"
        stroke="#222"
        strokeWidth={2}
      />
      <Path
        d="M36 24v12h12"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M20 32h8v8h-8z"
        fill="#fff"
        stroke="#222"
        strokeWidth={2}
      />
    </Svg>
  );
}
