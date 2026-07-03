const currentDate = new Date();

const mockPoData = [
  {
    id: 0,
    customerName: 'John Doe',
    printed: false,
    invoiceId: null,
    createdAt: currentDate,
    done: false,
    poType: 'Eco Solvent',
    fileList: [
      {
        id: 0,
        filename: 'Test print 1_26-30_130x190_BIRU_3x',
        poId: 0,
      },
      {
        id: 1,
        filename: 'Test print 2_26-30_130x190_BIRU_3x',
        poId: 0,
      },
      {
        id: 2,
        filename: 'Test print 3_26-30_130x190_BIRU_3x',
        poId: 0,
      },
    ],
  },
  {
    id: 1,
    customerName: 'John Doe',
    printed: false,
    invoiceId: null,
    createdAt: currentDate,
    done: false,
    printType: 'Eco Solvent',
    fileList: [
      {
        id: 0,
        filename: 'Test print 4_26-30_130x190_BIRU_3x',
        poId: 1,
      },
      {
        id: 1,
        filename: 'Test print 5_26-30_130x190_BIRU_3x',
        poId: 1,
      },
      {
        id: 2,
        filename: 'Test print 6_31-35_130x190_BIRU_3x',
        poId: 1,
      },
    ],
  },
];

// MOCK FILES
const multipleFiles = [
  new File(
    ['Test print_26-30_130x190_BIRU_2x'],
    'Test print_26-30_130x190_BIRU_2x.tif',
    {
      type: 'image/tif',
    },
  ),
  new File(
    ['Test print 2_26-30_130x190_BIRU_3x'],
    'Test print 2_26-30_130x190_BIRU_3x.tif',
    { type: 'image/tif' },
  ),
];

// Setup valid/invalid file
const validFile = new File(
  ['Test print_26-30_130x190_BIRU_2x'],
  'Test print_26-30_130x190_BIRU_2x.tif',
  { type: 'image/tif' },
);

const invalidFile = new File(
  ['Test_print_26-30_130x190_2x'],
  'Test_print_26-30_130x190_2x.tif',
  { type: 'image/tif' },
);

// Mock Invoice Data
const invoiceData = [
  {
    id: 0,
    invoiceNumber: 1071,
    customerName: 'John Doe',
    customerPhone: '8888 8888 8888',
    amount: [{ id: 1, ecoSOlvent: 100000, sublim: 0, total: 100000 }],
    paymentDetails: [],
    createdAt: currentDate,
    status: 'pending',
    orderList: mockPoData[0].fileList.map((list) => list),
  },
  {
    id: 1,
    invoiceNumber: 1072,
    customerName: 'John Doe',
    amount: [{ id: 1, ecoSOlvent: 200000, sublim: 0, total: 200000 }],
    paymentDetails: [],
    customerPhone: '0000 0000 0000',
    createdAt: currentDate,
    status: 'pending',
    orderList: mockPoData[1].fileList.map((list) => list),
  },
  {
    id: 2,
    invoiceNumber: 1073,
    customerName: 'Jane Doe',
    customerPhone: '8888 8888 8888',
    amount: [{ id: 1, ecoSOlvent: 800000, sublim: 0, total: 800000 }],
    paymentDetails: [],
    createdAt: currentDate,
    status: 'pending',
    orderList: mockPoData[0].fileList.map((list) => list),
  },
  {
    id: 3,
    invoiceNumber: 1074,
    customerName: 'Jane Doe',
    amount: [{ id: 1, ecoSOlvent: 700000, sublim: 0, total: 700000 }],
    paymentDetails: [],
    customerPhone: '0000 0000 0000',
    createdAt: currentDate,
    status: 'pending',
    orderList: mockPoData[1].fileList.map((list) => list),
  },
];

export { mockPoData, multipleFiles, validFile, invalidFile, invoiceData };
