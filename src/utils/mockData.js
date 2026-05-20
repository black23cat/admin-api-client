const mockPoData = [
  {
    id: 0,
    customerName: 'John Doe',
    printed: false,
    invoiceId: null,
    createdAt: new Date(),
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
    createdAt: new Date(),
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

export { mockPoData, multipleFiles, validFile, invalidFile };
