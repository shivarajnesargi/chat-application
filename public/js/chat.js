var socket = io.connect("http://localhost:4000");

var message = document.getElementById('message');
var btn = document.getElementById('send');
var handle = document.getElementById('handle');
var chatBody = document.getElementById('chat');
var feedback = document.getElementById('feedback');


btn.addEventListener('click',function(){
  var data ={'handle':handle.value,'message':message.value};
  socket.emit('chat',data);
});

socket.on('chat',function(data){
feedback.innerHTML='';
chatBody.innerHTML+='  <li class="left clearfix"><span class="chat-img pull-left">'+
                            '<img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />'+
                        '</span>'+
                            '<div class="chat-body clearfix">'+
                                '<div class="header">'+
                                    '<strong class="primary-font">'+data.handle+'</strong>'+ '<small class="pull-right text-muted">'+
                                        '<span class="glyphicon glyphicon-time"></span>'+'12 mins ago</small>'+
                                '</div>'+
                                '<p>'
                                    +data.message+
                                '</p>'+
                            '</div>'+
                        '</li>';
});

message.addEventListener('keypress',function(){
  socket.emit('typing',handle.value);
})

socket.on('typing',function(handle){
  feedback.innerHTML='<p>'+handle+' is typing </p>';
});
