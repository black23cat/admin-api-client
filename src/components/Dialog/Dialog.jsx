import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import styles from './Dialog.module.css';

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
