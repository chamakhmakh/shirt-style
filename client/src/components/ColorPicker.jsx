import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          "#ccc",
          "#EFBD48",
          "#F9D423",
          "#8BC34A",
          "#039BE5",
          "#673AB7",
          "#E91E63",
          "#9C27B0",
          "#FF9800",
          "#F44336",
          "#2196F3",
          "#03A9F4",
          "#FFEB3B",
          "#795548",
          "#607D8B",
        ]}
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
