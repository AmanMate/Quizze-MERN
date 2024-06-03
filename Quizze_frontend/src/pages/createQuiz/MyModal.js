import React, { useState } from "react";
import Mymodal from "./MyModal";

export default function ParentComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleModalOpen}>Create Quiz</button>
      {showModal && <Mymodal closeModal={handleModalClose} />}
    </div>
  );
}