"use client";

import React from "react";

type Props = {};

export default function Origin({}: Props) {
  const [origin, setOrigin] = React.useState<string>("");

  React.useEffect(() => {
    const url = new URL(window.location.href).hostname;
    setOrigin(url);
    return () => {};
  }, []);

  return <>{origin}</>;
}
