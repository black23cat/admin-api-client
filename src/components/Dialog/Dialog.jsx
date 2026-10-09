import { useEffect, useRef } from 'react';
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
    <dialog
      className={styles['main-dialog']}
      ref={modalRef}
      onCancel={closeModal}
    >
      {children}
    </dialog>
  );
}
