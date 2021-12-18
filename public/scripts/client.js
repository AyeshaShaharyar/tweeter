// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(tweetDb) {
  const tweet = $(`<article>
  <header class="article-header">
    <div class="header-div"> 
      <img src="${tweetDb.user.avatars}">
      <name>${tweetDb.user.name}</name>
    </div>
    <div class="handle">
      <a>${tweetDb.user.handle}</a> 
    </div>
  </header>
  <div class="tweet-text">   
    <p>${escape(tweetDb.content.text)}</p>
   
  </div>
  <hr>
  <footer>
    <div class="time">${timeago.format(tweetDb.created_at)}</div>
    <div class="icons">
      <span >
        <i class="fas fa-flag fa-xs"></i>
        <i class="fas fa-retweet fa-xs"></i>
        <i class="fas fa-heart fa-xs"></i>
      </span>
    </div>
  </footer>
</article>`);

  return tweet;
}

// loops through tweets
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    // Targetting the container and appending the item to it
    const tweetElement = createTweetElement(tweet);
    $(".tweet-container").prepend(tweetElement);

    // calls createTweetElement for each tweet
    // takes return value and prepends it to the tweets container
  }
};

$(document).ready(function () {
  // catch the form submit

  $("#tweet-text").on('change keyup paste', function () {
    let tweetText = $(this).val().length;
    if (tweetText === 0 || tweetText < 140 ) {
      $(".alert")
      .slideUp();
    }
  });

  $("#tweet-frm").on("submit", function (event) {
    event.preventDefault();
    let $tweetData = $("#tweet-text");

    const data = $(this).serialize();

    if ($tweetData.val().length === 0) {
      $(".alert")
        .css("visibility", "visible")
        .text("Your tweet is empty!")
        .slideDown();
    } else if ($tweetData.val().length > 140) {
      $(".alert")
        .css("visibility", "visible")
        .text("Your tweet is too long. Only 140 characters are allowed!")
        .slideDown();
    } else {
      // this => <form>...</form>
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: function (data) {
          console.log("success");
          $tweetData.val("");
          loadtweets();
        },
      });
    }
  });

  const loadtweets = function () {
    $.ajax({
      url: "/tweets",
      data: "data",
      success: function (data) {
        renderTweets(data);
        console.log("success");
      },
    });
  };

  loadtweets();
});
