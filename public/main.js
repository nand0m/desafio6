const socket = io.connect();


function render(data) {
    
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.email}</strong>:
            <em>${elem.msg}</em>
        </div>`)
    }).join(" ");


    document.getElementById('messages').innerHTML = html;
    
}


function addMessage(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        dateTime: 0,
        msg: document.getElementById('msg').value
    };
    
    socket.emit('new-message', mensaje);

    return false;
}

socket.on('messages', data => {
    render(data);
})