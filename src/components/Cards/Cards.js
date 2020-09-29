//Import libraries
import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

//Import components

//Import scoped class modules
import classes from "./Cards.module.scss";

//Stateless component
const Cards = React.memo(
  ({ text, date }) => {
    // console.log("Rendering");
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.date === nextProps.date && prevProps.date === nextProps.date
    );
  }
);

Cards.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Cards;
