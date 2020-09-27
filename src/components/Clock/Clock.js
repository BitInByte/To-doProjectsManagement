import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import classes from "./Clock.module.scss";

const Clock = () => {
  useEffect(() => {
    return () => {
      clearInterval(clockInterval);
    };
  });

  // Animation props
  // const props = useSpring({
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  //   config: {
  //     duration: 600,
  //   },
  //   reset: true,
  // });

  const [clock, setClock] = useState(new Date());

  const clockInterval = setInterval(() => {
    setClock(new Date());
  }, 1000);

  return (
    <div>
      <p className={classes.Clock}>
        {clock.getHours().toString().padStart(2, "0")}:
        {clock.getMinutes().toString().padStart(2, "0")}:
        {clock.getSeconds().toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default Clock;
