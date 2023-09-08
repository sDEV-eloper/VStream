
import { useEffect, useRef, useState } from 'react';
import {BiSearch} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const SearchSuggestionData = ( { searchSuggestions }) => {
  const componentRef=useRef(null)
  const [isVisible, setIsVisible]=useState(true)
  const navigate = useNavigate();
  const handleClick=(item)=>{
    navigate(`/searchResult/${item}`);
    setIsVisible(false)
  }
  const handleOutsideClick = (e) => {
    // Check if the click target is outside the component
    if (componentRef.current && !componentRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Attach an event listener to the document to handle outside clicks
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <>
  {isVisible &&  <div className="bg-gray-700 text-white  z-10 absolute sm:mt-[95%] w-full p-4 rounded-xl ">
        {
            searchSuggestions.map((item)=>(
                <li key={item} className="list-none flex gap-4 items-center hover:bg-gray-800 rounded-lg p-2 cursor-pointer" onClick={()=>handleClick(item)}>
                    <BiSearch/>
                    {item}
                </li>
            ))
        }
    </div>}
    </>
  )
}

export default SearchSuggestionData