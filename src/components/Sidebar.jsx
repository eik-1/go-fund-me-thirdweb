import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo } from "../assets";
import { navlinks } from "../constants";

function Icon({ styles, name, imgUrl, isActive, disabled, handleClick }) {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <div className="w-[40px] h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[100%] h-[100%] object-contain rounded-[10px]"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col items-center justify-between bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 ">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
