var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';

app.friends = [];

app.init = function() {
  app.clearMessages();
  app.fetch();
};

app.send = function(msg) {

  $.ajax({
    // always use this url
    url: app.server,
    type: 'POST',
    data: JSON.stringify(msg),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){

// TODO
  $.get( app.server, function( data ) {
      //For loop: iterate over data.results (up to data.results.length)
      //It's an array of objects
      //So for each data.result[i] you can find [username], [text], [message]
      _.each(data.results, function(chat){
        app.addMessage(chat);
      });

    });

};

app.clearMessages = function(){
  $("#chats").empty();
};

// adds a message object to the page
app.addMessage = function(msg) {

  // TODO: style this ishhhhhh
  var $chat = $('<div>').addClass('chat');

  var $username = $('<div>').addClass('username');
  var $username_link = $('<a>').attr('href', '#')
        .addClass('username_link')
        .text(msg.username)
        .click(function(){ app.addFriend(msg.username); });
  $username.append($username_link);
  var $text = $('<div>').addClass('text').text(msg.text);
  var $roomname = $('<div>').addClass('roomname').text(msg.roomname);

  $chat.append($username).append($text).append($roomname);
  $('#chats').append($chat);

};

app.addRoom = function(roomName) {
   var $rooms = $("#roomSelect");

   //TODO: style this div, yo
   var $room = $('<div>').text(roomName);
   $rooms.append($room);

};

app.addFriend = function(name) {
  app.friends.push(name);
};

app.init();
app.addRoom('Home');
