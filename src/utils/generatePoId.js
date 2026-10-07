export default function generatePoId(po) {
  const createdAt = new Date(po.createdAt);
  const poId = po.id;
  // const idLength = poId.toString().length;
  // const idPrefix = '000000'.slice(0, 6 - idLength);
  return `PO-${createdAt.getMonth() + 1 < 10 ? '0' : ''}${
    createdAt.getMonth() + 1
  }${createdAt.getFullYear().toString().slice(2)}-00${poId}`;
}
