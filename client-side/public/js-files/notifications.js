// notifications.js
function showNotification(message, color) {
    const notificationDiv = document.getElementById('notification');
    notificationDiv.innerHTML = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
}
