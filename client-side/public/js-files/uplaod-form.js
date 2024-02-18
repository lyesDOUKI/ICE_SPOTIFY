// uploadForm.js
function updateFileName(input) {
    const fileName = input.files[0].name;
    const label = input.nextElementSibling;
    label.innerText = fileName;
    const fileNameMessage = document.getElementById('fileNameMessage');
    fileNameMessage.innerHTML = `Click on Upload to send the song : <strong>${fileName}</strong>`;
}

document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const musicStyle = document.getElementById('musicStyle').value;
    formData.append('musicStyle', musicStyle);
    showSpinner();
    try {
        const response = await sendFormData('/upload', formData);
        hideSpinner();
        if (response.ok) {
            showNotification('Upload successful!', 'success');
        } else {
            showNotification('Upload failed. Please try again.', 'danger');
        }
    } catch(error) {
        hideSpinner();
        showNotification('An error occurred. Please try again later.', 'danger');
    }
});
