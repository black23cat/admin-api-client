import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import PurchaseOrderForm from '../components/PoForm/PoForm.jsx';
//Setup mockfiles
import { invalidFile, multipleFiles, validFile } from '../utils/mockData.js';
import { removeExtension } from '../utils/regexPattern.js';

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
    await user.upload(uploadFiles, multipleFiles);
    expect(uploadFiles.files.length).toEqual(2);
    expect(uploadFiles.files[0]).toStrictEqual(multipleFiles[0]);
    expect(uploadFiles.files[1]).toStrictEqual(multipleFiles[1]);
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
    const filename = removeExtension(validFile.name);
    const uploadFiles = screen.getByLabelText('Upload Files :');
    const submitBtn = screen.getByText('Submit');

    await user.upload(uploadFiles, validFile);
    await user.upload(uploadFiles, invalidFile);
    await user.click(submitBtn);

    //eslint-disable-next-line
    const [url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.length).toEqual(1);
    expect(body[0]).toEqual(filename);
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

    await user.upload(uploadFiles, invalidFile);
    await user.click(submitBtn);
    expect(mockFetch).not.toBeCalled();
    const errorMsg = screen.getByText('Tidak ada file yang diupload');
    expect(errorMsg).toBeInTheDocument();
  });
});
