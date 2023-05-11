const BASE_URL = "https://api.wiiqare-app.com/api/v1";

export async function sendEmail (formData) {
    try {
        delete formData.confirm_password;

        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(BASE_URL + "/provider/send-email-verification", Options);
        const json = await response.json();

        return json

    } catch (error) {
        return error
    }
}

export async function sendOtp (formData) {
    try {
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }

        const response = await fetch(BASE_URL + "/session/email-validate-otp", Options);
        const json = await response.json();
        
        console.log("test", json);
        return json

    } catch (error) {
        return error
    }
}

export async function register (payload) {
    try {

        console.log(`see if the file is there! ${payload.logo}`);
        
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(7);

        const formData = new FormData();
        
        formData.append('name', payload.name);
        formData.append('nationalId', payload.nationalId);
        formData.append('phone',payload.phone);
        formData.append('postalCode',payload.postalCode);

        formData.append('logo', payload.logo);

        formData.append('emailVerificationToken', 'xxxxxx');
        
        formData.append('address', payload.address);
        formData.append('businessRegistrationNo', payload.businessRegistrationNo);
        formData.append('businessType', payload.businessType);
        formData.append('city',payload.city);

        formData.append('contactPerson.country',payload.contactPerson.country);
        formData.append('contactPerson.email', payload.contactPerson.email);
        formData.append('contactPerson.firstName', payload.contactPerson.firstName);
        formData.append('contactPerson.lastName', payload.contactPerson.lastName);
        formData.append('contactPerson.occupation', payload.contactPerson.occupation);
        formData.append('contactPerson.phone', payload.contactPerson.phone);

        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data; boundary='+ boundary, //NOTICE: added boundary
            },
            body: formData
        }

        const response = await fetch(`${BASE_URL}/provider`, Options);
        
        return response.data;
        
    } catch (error) {
        return error
    }
}

export async function login (credentials) {
    try {
        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        }

        const response = await fetch(BASE_URL + "/session", Options);
        const json = await response.json();
        
        return json
        
    } catch (error) {
        return error
    }
}

export async function autocomplete(phone, token) {
    try {

        const Options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await fetch(`${BASE_URL}/payer/patient/${phone}`, Options);
        const json = await response.json();
        
        console.log(json);
        return json
        
    } catch (error) {
        return error
    }
}

export async function savePatient (formData) {
    try {
        console.log(formData);
        let token = formData.accessToken;

        delete formData.accessToken;

        const Options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(BASE_URL + "/payer/patient", Options);
        const json = await response.json();
        
        console.log("save", json);
        return json
        
    } catch (error) {
        return error
    }
}