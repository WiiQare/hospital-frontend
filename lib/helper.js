const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function sendEmail(formData) {
  try {
    delete formData.confirm_password;

    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      BASE_URL + '/provider/send-email-verification',
      Options,
    );
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

export async function sendOtp(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      BASE_URL + '/session/email-validate-otp',
      Options,
    );
    const json = await response.json();

    console.log('test', json);
    return json;
  } catch (error) {
    return error;
  }
}

export async function register(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(BASE_URL + '/provider', Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

export async function login(credentials) {
  try {
    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    };

    const response = await fetch(BASE_URL + '/session', Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

export async function autocomplete(phone, token) {
  try {
    const Options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${BASE_URL}/payer/patient/${phone}`, Options);
    const json = await response.json();

    console.log(json);
    return json;
  } catch (error) {
    return error;
  }
}

export async function savePatient(formData) {
  try {
    console.log(formData);
    let token = formData.accessToken;

    delete formData.accessToken;

    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(BASE_URL + '/payer/patient', Options);
    const json = await response.json();

    console.log('save', json);
    return json;
  } catch (error) {
    return error;
  }
}

export async function sendSecurityCode(formData) {
  try {
    console.log(formData);
    let token = formData.accessToken;

    delete formData.accessToken;

    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      BASE_URL + '/provider/provider-authorize-voucher-transfer',
      Options,
    );
    const json = await response.json();

    console.log('save', json);
    return json;
  } catch (error) {
    return error;
  }
}

export async function addService(formData) {
  try {
    let token = formData.accessToken;

    delete formData.accessToken;

    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(BASE_URL + '/provider/service', Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

export async function addPackage(formData) {
  try {
    let token = formData.accessToken;

    delete formData.accessToken;

    const Options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      BASE_URL + `/provider/${formData.providerId}/package`,
      Options,
    );
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

export async function convertCurrency(from, amount, to) {
  try {
    const Options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: `i6sKwItIpG9o1PLxB6nykJ5OFecFsW8X`,
      },
    };

    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      Options,
    );
    const json = await response.json();

    console.log(json);
    return json;
  } catch (error) {
    return error;
  }
}
