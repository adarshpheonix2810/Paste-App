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
    <div>
      <input
        type="search"
        className="border-2 border-amber-700 p-2 mt-2 rounded-xl"
        placeholder="Search pastes by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-4 mt-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="flex flex-row gap-4 items-center border-2 border-amber-700 p-2 rounded-xl"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="">{paste.title}</h1>
                  <p>{paste.content}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="text-sm italic">
                    Created At: {new Date(paste.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-row gap-2 ml-auto place-content-evenly">
                  <button>
                    <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                  </button>
                  <button>
                    <Link to={`/pastes/${paste?._id}`}>
                      View</Link>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied Successfully");
                    }}
                  >
                    Copy
                  </button>
                  <button onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/pastes/${paste?._id}`
                      );
                      toast.success("Link Copied Successfully");
                    }}>
                    Copy Link
                    
                    </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Paste;
