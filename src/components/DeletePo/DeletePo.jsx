import styles from './DeletePo.module.css';
export default function DeletePo({ handleModalBtnClick }) {
  return (
    <div className={styles['delete-po']}>
      {' '}
      <h3>Hapus Purchase Order</h3>
      <div>
        <button onClick={() => handleModalBtnClick('cancel')}>Batal</button>
        <button onClick={() => handleModalBtnClick('confirm')}>Hapus</button>
      </div>
    </div>
  );
}
