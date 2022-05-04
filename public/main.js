const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
    
}

function addMessage(e) {
    const mensaje = {
        email: document.getElementById('username').value,
        dateTime: 0,
        msg: document.getElementById('texto').value
    };
    
    socket.emit('new-message', chat_persistente);

    return false;
}

socket.on('messages', data => {
    render(data);
})