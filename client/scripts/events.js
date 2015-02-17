$(function(){


  /* ****************
   * EVENT HANDLERS *
   * ****************/

  $('.refresh').on('click', this, function(){
      app.init();
  });

  $('#button').on('click', this, function() {
      var msg = {username : $('#newName').val(), roomname: $('#newRoom').val(), text: $('#newText').val() };
      app.send(msg);
      $('#newText').val("");
  });

  /* **************
   * DEFAULT CODE *
   * **************/

  //app.init();
  //app.addRoom('Home');

});
