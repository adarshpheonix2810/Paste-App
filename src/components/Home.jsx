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
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          placeholder="Enter your text"
          className="border-2 border-amber-700 p-2 mt-2 rounded-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        onClick={createPaste} 
        className=" border-2 border-amber-700 p-2 mt-2 rounded-xl ">
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="border-2 border-amber-700 p-2 mt-2 rounded-2xl w-full h-96"
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
