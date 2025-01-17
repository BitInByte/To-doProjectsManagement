//Import libraries
import React, { useState } from "react";
import PropTypes from "prop-types";

//Import components
import Navbar from "../../components/Navbar/Navbar";
import SideDrawer from "../../components/Navbar/SideDrawer/SideDrawer";
import BackDrop from "../../components/UI/BackDrop/BackDrop";
import Footer from "../../components/Footer/Footer";

//Import scoped class modules
import classes from "./Layout.module.scss";

//Stateless component
const Layout = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const { children, initials, profileImage } = props;

  // Toggle at click the SideDrawer variable to true or false
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  // Close the SideDrawer at modal click
  const backDropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop = null;

  if (sideDrawerOpen) {
    // If it's true then it's open and we need the modal
    backdrop = <BackDrop click={backDropClickHandler} />;
  }

  return (
    <>
      {/* NAV */}
      <Navbar
        profileImage={profileImage}
        initials={initials}
        drawerClickHandler={drawerToggleClickHandler}
      />
      <SideDrawer show={sideDrawerOpen} click={drawerToggleClickHandler} />
      {backdrop}
      {/* MAIN */}
      <main className={classes.Content}>{children}</main>
      {/* FOOTER */}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  initials: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  profileImage: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

export default Layout;
