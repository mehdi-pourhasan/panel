import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiNotification3Line } from "react-icons/ri";
import { Cart, Chat, Notification, UserProfile } from "./";
import { useStateContext } from "../contexts/ContextProvider";

import avatar from "../data/avatar.jpg";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    // eslint-disable-next-line no-unused-vars
    activeMenu,
    setActiveMenu,
    isClicked,
    // eslint-disable-next-line no-unused-vars
    setIsClicked,
    handleClick,
    screenSize,
    currentColor,
    setScreenSize,
  } = useStateContext();

  // GET SCREEN SIZE
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  // CHANGE MENU STATUS BASE ON SCREEN SIZE
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          title="Cart"
          // eslint-disable-next-line no-undef
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />

        <NavButton
          title="Chat"
          // eslint-disable-next-line no-undef
          customFunc={() => handleClick("chat")}
          dotColor="#03C9D7"
          color={currentColor}
          icon={<BsChatLeft />}
        />

        <NavButton
          title="Notifications"
          // eslint-disable-next-line no-undef
          customFunc={() => handleClick("notification")}
          dotColor="#03c9d7"
          color={currentColor}
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            // eslint-disable-next-line no-undef
            onClick={() => handleClick("userProfile")}
          >
            <img
              src={avatar}
              alt="User Profile"
              className="rounded-full w-8 h-8"
            />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>
              <span className="text-gray-400 text-14 ml-1 font-bold">
                Mehdi
              </span>
            </p>
            <MdKeyboardArrowDown className="text-green-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
