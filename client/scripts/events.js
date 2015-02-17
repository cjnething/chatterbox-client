$(function(){
  console.log('booyah');
  $('.refresh').on('click', this, function(){

      app.init();
      console.log('asdf');
  });

  $('.username').on('click', function(e) {
     console.log("eureka");
     e.preventDefault();
  });
});
