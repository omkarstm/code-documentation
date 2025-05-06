import React from "react";

const BoxGrid = () => {
  return (
    <div className="absolute flex bg-gray-100 border-2 border border-gray-100  rounded-xl z-[-1] dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105 w-134">
      {Array.from({ length: 65 }).map((_, index) => (
        <div
          key={index}
          className={`w-10 h-10 flex shrink-0 rounded-[2px] bg-gray-50 dark:bg-neutral-950 ${
            index % 2 === 1
              ? "shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              : ""
          }`}
        />
      ))}
    </div>
  );
};

export default BoxGrid;
