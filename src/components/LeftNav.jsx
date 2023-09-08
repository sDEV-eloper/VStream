import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
    const { selectCategories, setSelectCategories, mobileMenu, setMobileMenu } = 
        useContext(Context);

    const navigate = useNavigate();

    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                return setSelectCategories(name);
            case "home":
                return setSelectCategories(name);
            case "menu":
                return false;
            default:
                break;
        }
    };

const mobileMenuClass=mobileMenu? 'md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all translate-x-0' : 'md:relative'

    return (
        <div
        // className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative  translate-x-[-240px] md:translate-x-0 transition-all `}
            className={`w-[240px] overflow-y-auto h-full py-4 bg-black absolute z-10 ${mobileMenuClass}` }
        >
            <div className="flex px-5 flex-col">
                {categories.map((item) => {
                    return (
                        <React.Fragment key={item.name}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickHandler(item.name, item.type);
                                    navigate("/");
                                    setMobileMenu(!mobileMenu);
                                }}
                                className={`${
                                    selectCategories === item.name
                                        ? "bg-gradient-to-l from-green-300 via-blue-500 to-purple-600 "
                                        : ""
                                }`}
                            />
                            {item.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>
                    );
                })}
                <hr className="my-5 border-white/[0.2]" />
                <div className="text-white/[0.5] text-[12px]">
                    Created by: Suraj Singh
                </div>
            </div>
        </div>
    );
};

export default LeftNav;