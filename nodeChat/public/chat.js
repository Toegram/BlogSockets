//MAKE CONNECTION TO https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js.map in Index.html
const URL = "http://localhost:4000"
const socket = io.connect(URL)

//Query DOM
let message = document.getElementById('message')
let handle = document.getElementById('handle')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let feedback = document.getElementById('feedback')


//Emit Events
console.log(btn);
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value)
})

//Listen for Events
socket.on('chat', function(data){
  feedback.innerHTML = ''
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = "<p><em>" + data + "is typing a message...</em></p>"
})
