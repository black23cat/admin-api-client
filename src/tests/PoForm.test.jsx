import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import PurchaseOrderForm from '../components/PoForm/PoForm.jsx';

//Setup multiple uploaded mockfiles
const files = [
  new File(['Test print_26-30_130x190_2x'], 'Test print_26-30_130x190_2x.tif', {
    type: 'image/tif',
  }),
  new File(
    ['Test print 2_26-30_130x190_3x'],
    'Test print 2_26-30_130x190_3x.tif',
    { type: 'image/tif' },
  ),
];

// Setup valid/invalid file
const validFile = new File(
  ['Test print_26-30_130x190_2x'],
  'Test print_26-30_130x190_2x.tif',
  { type: 'image/tif' },
);

const invalidFiles = new File(
  ['Test_print_26-30_130x190_2x'],
  'Test_print_26-30_130x190_2x.tif',
  { type: 'image/tif' },
);

describe('Render Purchase Order Form', () => {
  it('Render Purchase Order Form correctly', () => {
    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );
    // Correctly render PO Form
    const customerNameField = screen.getByLabelText('Nama Customer :');
    const uploadFiles = screen.getByLabelText('Upload Files :');
    expect(customerNameField).toBeInTheDocument();
    expect(uploadFiles).toBeInTheDocument();
  });
});

describe('Upload file', () => {
  it('Upload files', async () => {
    // Setup user event
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );

    const uploadFiles = screen.getByLabelText('Upload Files :');
    await user.upload(uploadFiles, files);
    expect(uploadFiles.files.length).toEqual(2);
    expect(uploadFiles.files[0]).toStrictEqual(files[0]);
    expect(uploadFiles.files[1]).toStrictEqual(files[1]);
  });

  it('Show valid/invalid uploaded filename', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );

    const uploadFiles = screen.getByLabelText('Upload Files :');
    await user.upload(uploadFiles, validFile);
    await user.upload(uploadFiles, invalidFiles);

    const validFileDisplay = screen.getByText('Test print_26-30_130x190_2x', {
      exact: false,
    });
    const invalidFIleDisplay = screen.getByText('Test_print_26-30_130x190_2x', {
      exact: false,
    });
    expect(validFileDisplay).toBeInTheDocument();
    expect(invalidFIleDisplay).toBeInTheDocument();
  });
});

describe('Send valid uploaded files to server', () => {
  it('Send only valid files to server', async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        status: 201,
        ok: true,
        json: () =>
          Promise.resolve({
            message: 'Order Created',
          }),
      }),
    );
    globalThis.fetch = mockFetch;

    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );

    const uploadFiles = screen.getByLabelText('Upload Files :');
    const submitBtn = screen.getByText('Submit');

    await user.upload(uploadFiles, validFile);
    await user.upload(uploadFiles, invalidFiles);
    await user.click(submitBtn);

    const [url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.length).toEqual(1);
    expect(body[0]).toEqual('Test print_26-30_130x190_2x');
  });
  it("Should not send fetch request when there's no valid files ", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        status: 201,
        ok: true,
        json: () =>
          Promise.resolve({
            message: 'Order Created',
          }),
      }),
    );
    globalThis.fetch = mockFetch;

    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );

    const uploadFiles = screen.getByLabelText('Upload Files :');
    const submitBtn = screen.getByText('Submit');

    await user.click(submitBtn);
    expect(mockFetch).not.toBeCalled();
    const errorMsg = screen.getByText('Tidak ada file yang diupload');
    expect(errorMsg).toBeInTheDocument();
  });
});
