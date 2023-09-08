import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import vstream from "../images/vstream.png";
import myProfile from "../images/profile2.png"
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import Loader from "../shared/Loader";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import SearchSuggestionData from "./SearchSuggestionData";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
const [showSuggestion, setShowSuggestion]=useState(true)
    const { loading, mobileMenu, setMobileMenu } = useContext(Context);
    const navigate = useNavigate();
    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

//Make search api call on debounce of 200ms
useEffect(()=>{
    const timer=setTimeout(()=>getSearchSuggestions(),200)
   return ()=>{clearTimeout(timer)}
},[searchQuery])


const getSearchSuggestions=async()=>{

    const data= await fetch(YOUTUBE_SEARCH_API+`${searchQuery}`)
    const json= await data.json();
    setSearchSuggestions(json[1]);
}
    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black  dark:bg-black">
            {loading && <Loader />}

            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {!mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
                   <img
                        className="w-12"
                        src={vstream}
                        alt="Youtube"
                    />
                    <h1 className="md:block hidden text-2xl font-bold bg-gradient-to-l from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">Stream</h1>
                </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <div className="flex flex-col items-center justify-center relative ">
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                        onFocus={()=>{setShowSuggestion(true)}}
                        onBlur={()=>{setShowSuggestion(false)}}
                    />
                  {searchQuery && showSuggestion &&  <SearchSuggestionData searchSuggestions={searchSuggestions}/>}
                    </div>
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-gray-800"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4  items-center justify-center bg-yellow-400">
                    <img src={myProfile} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Header;



