$(function(){


  /* ****************
   * EVENT HANDLERS *
   * ****************/

  $('.refresh').on('click', this, function(){
      app.init();
  });

  /* **************
   * DEFAULT CODE *
   * **************/

  app.init();
  app.addRoom('Home');

});
