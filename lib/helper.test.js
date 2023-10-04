import {
  addPackage,
  addService,
  autocomplete,
  convertCurrency,
  login,
  register,
  savePatient,
  sendEmail,
  sendOtp,
  sendSecurityCode,
} from './helper';

describe('Helper functions', () => {
  beforeEach(() => {
    console.log = jest.fn();
    fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({
        hello: 'world',
      }),
    });
  });

  it('sendEmail', async () => {
    const response = await sendEmail({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('sendOtp', async () => {
    const response = await sendOtp({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('register', async () => {
    const response = await register({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('login', async () => {
    const response = await login({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('autocomplete', async () => {
    const response = await autocomplete({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('savePatient', async () => {
    const response = await savePatient({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('convertCurrency', async () => {
    const response = await convertCurrency({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('sendSecurityCode', async () => {
    const response = await sendSecurityCode({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('addService', async () => {
    const response = await addService({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });

  it('addPackage', async () => {
    const response = await addPackage({ test: 'payload' });

    expect(response).toEqual({ hello: 'world' });
  });
});

describe('Helper functions errors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error('test')),
    });
  });

  it('sendEmail', async () => {
    fetch = jest.fn().mockRejectedValueOnce(new Error('test'));

    const res = await sendEmail({ test: 'payload' });
    expect(res).toEqual(new Error('test'));
  });

  it('sendOtp', async () => {
    const response = await sendOtp({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('register', async () => {
    const response = await register({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('login', async () => {
    const response = await login({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('autocomplete', async () => {
    const response = await autocomplete({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('savePatient', async () => {
    const response = await savePatient({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('convertCurrency', async () => {
    const response = await convertCurrency({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('sendSecurityCode', async () => {
    const response = await sendSecurityCode({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('addService', async () => {
    const response = await addService({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });

  it('addPackage', async () => {
    const response = await addPackage({ test: 'payload' });

    expect(response).toEqual(new Error('test'));
  });
});
