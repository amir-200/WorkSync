document.addEventListener('DOMContentLoaded', function() {
    // Message sending functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.input-actions .material-icons:last-child');

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const chatMessages = document.querySelector('.chat-messages');
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerHTML = `
                <img src="user-avatar.jpg" alt="User" class="user-avatar">
                <div class="message-content">
                    <div class="message-info">
                        <span class="username">You</span>
                        <span class="message-text">${message}</span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(newMessage);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});