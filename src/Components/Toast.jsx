import React, { useState } from "react";


function Toast({ message, onClose, color }) {
  
  const [showToast, setShowToast] = useState(true);
 

  const handleClose = () => {
    setShowToast(false);
    onClose();
  };

  return (
    <div
      className={`fixed z-50 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        showToast ? "block" : "hidden"
      }`}
    >
      <div className="bg-gray-50 text-black rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold" style={{ color: color }}>
            {message}!
          </p>
          <button
            onClick={handleClose}
            className="text-black hover:text-black focus:outline-none ml-3"
            style={{color: color}}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 1a9 9 0 100 18 9 9 0 000-18zM6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
