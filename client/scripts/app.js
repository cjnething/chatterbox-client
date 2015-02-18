
/********************
 * GLOBAL VARIABLES *
 * ******************/

var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';

app.friends = {};
app.rooms = {};
app.rawData = [];
app.stopTimer = false;
app.timerInterval = 4000;

// Clears and repopulates the chats section
app.init = function() {

  var subroutine = function(){

    app.roomify();
    var i = 0;

    (function nextMessage(){

      setTimeout(function(){
        $('#chatterbox').fadeOut('slow', function(){
          app.addMessage(app.rawData[i]);
          $('#chatterbox').fadeIn('slow', function(){
            i++;
          }).delay(app.timerInterval);
          if(i < app.rawData.length && !app.stopTimer){ nextMessage(); }
          else if(app.stopTimer) {
            app.stopTimer = false;
          }
        });
      }, app.timerInterval);

    })();

  };

  app.clearMessages();
  app.fetch(subroutine);

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
  $("#name").find($('a')).empty();
  $('#room').empty();
  $('#text').empty();
};

// adds a message object to the page
app.addMessage = function(msg) {

  if(!msg) { return; }
  if (!msg.roomname) {
    msg.roomname = "Default";
  }
  if (!msg.username) {
    msg.username = "Student";
  }
  if (!msg.text) {
    msg.text = "Basic Tweet";
  }

  $("#room").text(msg.roomname);
  $("#name").find($('a')).text(msg.username);
  $("#text").text(msg.text);
};

app.addRoom = function(roomName) {
   //TODO: style this div, yo
   var $room = $('<div>').text(roomName);
   var $rooms = $('#roomSelect');

   $rooms.append($room);

};

app.addFriend = function(name) {

   for (var i = 0; i<$('#friends').children().length; i++) {
      if ($($('#friends').children()[i]).text() === name) {
         return;
      }
   }

  // adds friend to friends object
  var tweets = [];
  for(var i = 0; i <app.rawData.length; i++){
    if(app.rawData[i]['username'] === name){
      tweets.push(app.rawData[i]);
    }
  }

  app.friends[name] = tweets;
  var $link = $('<a>').attr('href', '#')
  .text(name)
  .on('click', function() {
    app.stopTimer = true;
              console.log("name", name);

    app.displayFriend(name);
  });
  // add a link to the friend in the friends section
  $('#friends').append($link);

};

app.displayFriend = function(name){

  app.clearMessages();
  app.roomify();
  var i = 0;

  (function nextMessage(){

    setTimeout(function(){
      $('#chatterbox').fadeOut('slow', function(){
        app.addMessage(app.friends[name][i]);
        $('#chatterbox').fadeIn('slow', function(){
          i++;
        }).delay(app.timerInterval);
        if(i < app.friends[name].length && !app.stopTimer){ nextMessage(); }
         else if(app.stopTimer) {
            app.stopTimer = false;
          }
      });
    }, app.timerInterval);

  })();



}



