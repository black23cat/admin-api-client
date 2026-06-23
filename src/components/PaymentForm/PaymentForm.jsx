import { useState } from 'react';
import formatter from '../../utils/formatter';

export default function PaymentForm({
  invoiceData,
  handleSubmit,
  cancelBtnHandler,
}) {
  const [paymentMethods, setPaymentMethods] = useState('Cash');
  const [amount, setAmount] = useState(1);

  return (
    <form onSubmit={(e) => handleSubmit(e, { paymentMethods, amount })}>
      <div>
        <label htmlFor="paymentMethods">Metode Pembayaran :</label>
        <select
          name="paymentMethods"
          id="paymentMethods"
          value={paymentMethods}
          onChange={(e) => setPaymentMethods(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Jumlah ({formatter.format(amount)}) :</label>
        <input
          type="number"
          name="amount"
          id="amount"
          min={1}
          max={Number(invoiceData.amount[0].total - invoiceData.totalPaid)}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Konfirmasi Pembayaran</button>
        <button type="button" onClick={cancelBtnHandler}>
          Batal
        </button>
      </div>
    </form>
  );
}
