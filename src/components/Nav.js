import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const renderButton = () => {
    if (isBrowser) {
      return (
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
      );
    } else {
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>;
    }
  };
  return (
    <nav>
      <h1>Waves</h1>
      {renderButton()}
    </nav>
  );
};

export default Nav;
