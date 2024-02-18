// serverCommunication.js
async function sendFormData(url, formData) {
    return await fetch(url, {
        method: 'POST',
        body: formData
    });
}
