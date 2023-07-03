"use client";

import { InView } from "react-intersection-observer";

export default function Crear() {
  return (
    <div className="mb-7 mt-40">
    <InView threshold={1}>
      {({ inView, ref, entry }) => (
        <div
          ref={ref}
          className="flex gap-10 justify-center text-6xl font-bold"
        >
          <div className={inView ? "get" : "opacity-0"}>Get</div>
          <div className={inView ? "set" : "opacity-0"}>Set</div>
          <div className={inView ? "create" : "opacity-0"}>Crear</div>
        </div>
      )}
    </InView>
    </div>
  );
}
