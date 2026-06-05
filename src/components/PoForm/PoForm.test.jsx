import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import PurchaseOrderForm from './PoForm.jsx';
//Setup mockfiles
import { invalidFile, multipleFiles, validFile } from '../../utils/mockData.js';
import { removeExtension } from '../../utils/regexPattern.js';

let mockNavigate;

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

beforeEach(() => {
  mockNavigate = vi.fn();
});

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
    const printType = screen.getByLabelText('Tipe po :');
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    expect(customerNameField).toBeInTheDocument();
    expect(uploadFiles).toBeInTheDocument();
    expect(printType).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
});

describe('Upload file', () => {
  it('Upload and delete uploaded files', async () => {
    // Setup user event
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );

    const uploadFiles = screen.getByLabelText('Upload Files :');
    await user.upload(uploadFiles, multipleFiles);
    expect(uploadFiles.files.length).toEqual(2);
    expect(uploadFiles.files[0]).toStrictEqual(multipleFiles[0]);
    expect(uploadFiles.files[1]).toStrictEqual(multipleFiles[1]);

    const deleteFileButtons = screen.getAllByRole('button', { name: 'x' });

    await user.click(deleteFileButtons[0]);

    const uploadedFiles = screen.getAllByText('Test', { exact: false });

    expect(uploadedFiles.length).toEqual(1);
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
    await user.upload(uploadFiles, invalidFile);

    const validFileDisplay = screen.getByText(removeExtension(validFile.name));
    const invalidFileDisplay = screen.getByText(
      removeExtension(invalidFile.name),
    );

    expect(validFileDisplay).toBeInTheDocument();
    expect(invalidFileDisplay).toBeInTheDocument();
  });
});

describe('Send valid uploaded files to server', () => {
  it('Send only valid files to server and redirect to purchase order page', async () => {
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
    const filename = removeExtension(validFile.name);
    const customerName = screen.getByLabelText('Nama Customer :');
    const uploadFiles = screen.getByLabelText('Upload Files :');
    const submitBtn = screen.getByText('Submit');

    await user.type(customerName, 'John Doe');
    await user.upload(uploadFiles, validFile);
    await user.upload(uploadFiles, invalidFile);
    await user.click(submitBtn);

    //eslint-disable-next-line
    const [url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.fileList.length).toEqual(1);
    expect(body.fileList[0].filename).toEqual(filename);

    expect(mockNavigate.mock.calls[0][0]).toEqual('/purchase-order');
  });

  it("Should not send fetch request when there's no valid files ", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn(() =>
      Promise.reject({
        status: 400,
        ok: false,
        json: () =>
          Promise.reject({
            message: 'Bad Request',
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

    await user.upload(uploadFiles, invalidFile);
    await user.click(submitBtn);
    expect(mockFetch).not.toBeCalled();
  });

  it('Render error message', async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn(() =>
      Promise.reject({
        status: 400,
        ok: false,
        json: () =>
          Promise.reject({
            message: 'Bad Request',
          }),
      }),
    );
    globalThis.fetch = mockFetch;

    render(
      <MemoryRouter>
        <PurchaseOrderForm />
      </MemoryRouter>,
    );

    const customerName = screen.getByLabelText('Nama Customer :');
    const uploadFiles = screen.getByLabelText('Upload Files :');
    const submitBtn = screen.getByText('Submit');
    await user.upload(uploadFiles, invalidFile);
    await user.click(submitBtn);

    expect(
      screen.getByText('Tidak ada file yang diupload'),
    ).toBeInTheDocument();

    await user.upload(uploadFiles, validFile);
    await user.click(submitBtn);

    expect(
      screen.getByText('Nama Customer tidak boleh kosong'),
    ).toBeInTheDocument();

    await user.type(customerName, 'John Doe');
    await user.upload(uploadFiles, validFile);
    await user.click(submitBtn);
    expect(screen.getByText('Gagal membuat invoice')).toBeInTheDocument();
  });
});
