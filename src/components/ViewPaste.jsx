import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

function ViewPaste() {
  const {id}= useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.find((p)=>p._id===id);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Paste title"
          className="w-full border-2 border-amber-700 p-3 rounded-xl bg-white text-gray-800"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className="border-2 border-amber-700 p-4 rounded-xl w-full h-96 bg-white text-gray-800"
          value={paste.content}
          rows={20}
          disabled
          placeholder="Content"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPaste