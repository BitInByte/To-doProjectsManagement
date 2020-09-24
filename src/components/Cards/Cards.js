//Import libraries
import React from "react";
import { useSpring, animated } from "react-spring";

//Import components

//Import scoped class modules
import classes from "./Cards.module.scss";

//Stateless component
const Cards = ({ text, date }) => {
  // Animation props
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });
  return (
    <animated.div style={props} className={classes.Cards}>
      <p>{text}</p>
      <span>{date}</span>
    </animated.div>
  );
};

export default Cards;
