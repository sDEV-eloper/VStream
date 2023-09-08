
import {BiSearch} from 'react-icons/bi'

const SearchSuggestionData = ( { searchSuggestions }) => {



  return (
    <>
<div className="bg-gray-700 text-white  z-10 absolute sm:mt-[95%] w-full p-4 rounded-xl ">
        {
            searchSuggestions.map((item)=>(
                <li key={item} className="list-none flex gap-4 items-center hover:bg-gray-800 rounded-lg p-2 cursor-pointer">
                    <BiSearch/>
                    {item}
                </li>
            ))
        }
    </div>
    </>
  )
}

export default SearchSuggestionData