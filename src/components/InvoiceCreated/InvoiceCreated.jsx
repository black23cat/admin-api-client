import styles from './InvoiceCreated.module.css';

export default function InvoiceCreated({ closeModal }) {
  return (
    <div className={styles['created-invoice']}>
      <h3>Berhasil membuat invoice</h3>
      <button type="button" onClick={closeModal}>
        Tutup
      </button>
    </div>
  );
}
