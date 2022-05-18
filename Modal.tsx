import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("body") as HTMLElement;

const Modal: React.FC<any> = ({ children }) => {
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        // Use this in case CRA throws an error about react-hooks/exhaustive-deps
        const current = el.current;

        // We assume `modalRoot` exists with '!'
        modalRoot!.appendChild(current);
        return () => void modalRoot!.removeChild(current);
    }, []);

    return createPortal(children, el.current);
};

export default Modal;
  
  
//useage
  
const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div>
      // you can also put this in your static html file
      <div id="modal-root"></div>
      {showModal && (
        <Modal>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100vh",
              width: "100vh",
              background: "rgba(0,0,0,0.1)",
              zIndex: 99,
            }}
          >
            I'm a modal!{" "}
            <button
              style={{ background: "papyawhip" }}
              onClick={() => setShowModal(false)}
            >
              close
            </button>
          </div>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
      // rest of your app
    </div>
  );
}
