//Import libraries
import React from 'react';

//Import components

//Import scoped class modules
import classes from './Footer.module.scss';

//Stateless component
const footer = () => (
    <div className={classes.Footer}>
        Made with <span role="img" aria-label="love"> ❤️ </span> for all devs around the <span role="img" aria-label="world"> 🌍 </span>!! Made by &copy;BitInByte
    </div>
);

export default footer;