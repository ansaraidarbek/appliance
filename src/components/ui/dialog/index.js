import React, { createContext, useContext, useState } from 'react';

const DialogContext = createContext();

export const Dialog = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export const DialogTrigger = ({ children, asChild }) => {
  const { setOpen } = useContext(DialogContext);
  
  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => setOpen(true)
    });
  }

  return (
    <button onClick={() => setOpen(true)}>
      {children}
    </button>
  );
};

export const DialogContent = ({ children }) => {
  const { open, setOpen } = useContext(DialogContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <button
            className="absolute top-0 right-0 p-2 m-2 text-gray-500 hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          {children}
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-25" onClick={() => setOpen(false)}></div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
    {children}
  </div>
);

export const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">
    {children}
  </h3>
);