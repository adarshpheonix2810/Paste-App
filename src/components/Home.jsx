import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes);
  useEffect(()=>{
        if(pasteId){
            const paste=allPastes.find((p)=>p._id===pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }   
    },[pasteId])
  function createPaste() {
    
    const paste={
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt:new Date().toISOString(),
    }
    
    if(pasteId){
        // update existing paste
        dispatch(updateToPastes(paste))
    }
    else{
        // create new paste
        dispatch(addToPastes(paste))
    }
    //after creating or updating paste, clear the input fields
    setTitle("");
    setValue("");
    setSearchParams({});
  }


  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter title"
          className="flex-1 border-2 border-amber-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-800 placeholder-gray-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
          onClick={createPaste} 
          className="border-2 border-amber-700 bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition-colors whitespace-nowrap">
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="border-2 border-amber-700 p-4 rounded-xl w-full h-96 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-800 placeholder-gray-500"
          value={value}
          rows={20}
          placeholder="Enter your content here"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
