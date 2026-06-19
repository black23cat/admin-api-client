import { useEffect, useRef } from 'react';

export default function Dialog({ isOpen, closeModal, children }) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);
  return (
    <dialog ref={modalRef} onCancel={closeModal}>
      {children}
    </dialog>
  );
}
