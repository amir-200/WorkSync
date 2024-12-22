const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const socket = io();


function handleSendMessage() {
    const message = messageInput.value.trim(); 
    if (message) {
        reply(message)
        socket.emit('message', message);
        messageInput.value = ''; 
    } else {
        alert('Input field is empty.');
    }
}



sendButton.addEventListener('click', handleSendMessage);

socket.on('message', (msg) => {
    response(msg)
});

socket.on("connect", ()=>{
    profile.uuid(socket.id)
})

socket.on('online', (user)=>{
    account(user.socketId, user.name)
    console.log(user.socketId, user.name)
})

socket.on('offline', (obj)=>{
    document.getElementById(`${obj.number}`).style.display = 'none'
    console.log('diconnect', obj.number)
})