$(function(){


  /* ****************
   * EVENT HANDLERS *
   * ****************/

  $('.refresh').on('click', this, function(){
      stopTimer = true;
      app.init();
  });

  $('#button').on('click', this, function() {
      var msg = {username : $('#newName').val(), roomname: $('#newRoom').val(), text: $('#newText').val() };

      app.send(msg);
      $('#newText').val("");
  });

  $("#name").find($('a')).on('click', this, function() {
      console.log($(this).text());
      app.addFriend($(this).text());
  });
  /* **************
   * DEFAULT CODE *
   * **************/

  app.init();
  //app.addRoom('Home');

});
