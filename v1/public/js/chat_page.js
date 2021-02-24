//html page id's
const chat_form = document.getElementById('send-container');

//chat reciver
const socket = io();

socket.emit('new_user', data)

// new user join
socket.on('message', (data) => {
    console.log(data)
    const send_msg = document.createElement('div');
    send_msg.className = 'message center';
    send_msg.innerHTML = data.name + ' : ' + data.msg;
    document.getElementById('container').append(send_msg);
    document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight // auto scrolling
});

//event emitter for send container
chat_form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default behaviour
    const send_msg = document.createElement('div');
    send_msg.className = 'message right';
    const msg = e.target.elements.messageInp.value;
    send_msg.innerHTML = "You : " + msg;
    document.getElementById('container').append(send_msg);
    e.target.elements.messageInp.value = ''; // clear the input field 
    socket.emit('msg-send', msg); // emitting message to server
    document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight // auto scrolling 
})

//event listner to recieve messages
socket.on('msg', (data) => {
    const send_msg = document.createElement('div');
    send_msg.className = 'message left';
    send_msg.innerHTML = data.name + ' : ' + data.msg;;
    document.getElementById('container').append(send_msg);
    document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight // auto scrolling
});