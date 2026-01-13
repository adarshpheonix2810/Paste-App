import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

function ViewPaste() {
  const {id}= useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.find((p)=>p._id===id);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          placeholder="Enter your text"
          className="border-2 border-amber-700 p-2 mt-2 rounded-xl"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button 
        onClick={createPaste} 
        className=" border-2 border-amber-700 p-2 mt-2 rounded-xl ">
          {pasteId ? "Update Paste" : "Create Paste"}
        </button> */}
      </div>
      <div>
        <textarea
          className="border-2 border-amber-700 p-2 mt-2 rounded-2xl w-full h-96"
          value={paste.content}
          rows={20}
          disabled
          placeholder="Enter your content here"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPaste