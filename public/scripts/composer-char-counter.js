  $(document).ready(function() {

    (document).getElementById("tweet-text").addEventListener("keyup",function() {
      let inputChars = ($(this).val()).length;
      let charLeft = (140 - inputChars);
  
      let counter = $(this).parent().children(".btn-count").children(".counter");
      counter.text(charLeft);
      if (charLeft < 0) {
        counter.css("color", "red");
      } else {
        counter.css("color", "black");
      }
  
    })
  });



// $('textarea').bind('keyup keydown', function() {
//   var count = $('#count');
//   var characters = $(this).val().length;

//   if (characters > maxCharacters) {
//       count.addClass('over');
//   } else {
//       count.removeClass('over');
//   }