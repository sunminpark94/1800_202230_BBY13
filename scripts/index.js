document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var messages = ["TA-DA"];

  function typeWriter(text, index , messageIndex) {
      if (index < text.length) {
          document.querySelector("#intro").innerHTML = text.substring(0, index+1) +'<span aria-hidden="true"></span>';
          setTimeout(function() {
              typeWriter(text, index + 1, messageIndex);
          }, 150);
      } else {
          setTimeout(function() {
              iterateThroughMessages(messageIndex + 1);
          }, 500);
      }
  }

  function iterateThroughMessages(messageIndex) {
      // if (messageIndex < messages.length) {
          var index = messageIndex % messages.length;
          typeWriter(messages[index], 0, index);
      // }
  }

  iterateThroughMessages(0);
});

