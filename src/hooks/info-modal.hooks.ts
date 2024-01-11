import { useState } from "react";

export const useInfoModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const infoModalHandler = {
    open: () => setOpenModal(true),
    close: () => setOpenModal(false),
  };

  return { openModal, infoModalHandler };
};
