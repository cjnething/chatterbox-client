
/********************
 * GLOBAL VARIABLES *
 * ******************/

var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';

app.friends = [];
app.rooms = {};
app.rawData = [];


// Clears and repopulates the chats section
app.init = function() {

  var cb = function(){
    _.each(app.rawData, function(data){
      app.addMessage(data);
    });
    app.roomify();
  };

  app.clearMessages();
  app.fetch(cb);

};

// Add tweets to the room object at the corresponding key
app.roomify = function(){

  for (var i = 0; i<app.rawData.length; i++) {
    if(!app.rooms[app.rawData[i]["roomname"]]){
      app.rooms[app.rawData[i]["roomname"]] = [];
    }else{
      app.rooms[app.rawData[i]["roomname"]].push(app.rawData[i]);
    }
  }
};

app.send = function(msg) {

  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(msg),
    contentType: 'application/json',
    success: function (data) {
      console.log(JSON.stringify(msg));
      console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

// gets 100 tweets and stores them in rawData
app.fetch = function(callback){
  $.get(app.server, function(data) {
    app.rawData = data.results;
    callback();
  });
};

app.clearMessages = function(){
  $('#chats').empty();
};

// adds a message object to the page
app.addMessage = function(msg) {

  // TODO: style this ishhhhhh
  var $chat = $('<div>').addClass('chat');

  var $username = $('<div>').addClass('username');
  var $username_link = $('<a>').attr('href', '#')
        .addClass('username_link')
        .text(msg.username)
        .on('click', function(){ app.addFriend(msg.username); });
  $username.append($username_link);

  var $text = $('<div>').addClass('text').text(msg.text);
  var $roomname = $('<div>').addClass('roomname').text(msg.roomname);

  $chat.append($username).append($text).append($roomname);
  $('#chats').append($chat);

};

app.addRoom = function(roomName) {
   //TODO: style this div, yo
   var $room = $('<div>').text(roomName);
   var $rooms = $('#roomSelect');

   $rooms.append($room);

};

app.addFriend = function(name) {
  if(app.friends.indexOf(name) === -1){
    app.friends.push(name);
  }
  $friends.append(name);
};

