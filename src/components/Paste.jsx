import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    //dispatch delete action
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <input
        type="search"
        className="w-full border-2 border-amber-700 p-3 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-800 placeholder-gray-500"
        placeholder="Search pastes by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="border-2 border-amber-700 p-4 rounded-xl bg-white"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <h1 className="font-bold text-lg text-gray-800">{paste.title}</h1>
                    <p className="text-gray-600 mt-1 line-clamp-2">{paste.content}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(paste.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/?pasteId=${paste?._id}`}>
                      <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">Edit</button>
                    </Link>
                    <Link to={`/pastes/${paste?._id}`}>
                      <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">View</button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(paste?._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied Successfully");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Copy
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/pastes/${paste?._id}`
                        );
                        toast.success("Link Copied Successfully");
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Paste;
