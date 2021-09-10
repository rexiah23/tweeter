//IIFE
(($) => {

  //Document.ready();
  $(function() {
    tweetsGetReq();
    $(".new-tweet form").submit(newTweetHandler);
    $('.sub-title img').click(textBoxToggler);
  });

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = tweetObj => {
    const name = tweetObj.user.name;
    const avatars = tweetObj.user.avatars;
    const handle = tweetObj.user.handle;
    const tweetText = escape(tweetObj.content.text);
    const createdAt = tweetObj.created_at;
    const timeAgo = timeago.format(createdAt);
    let $tweet = `
    <article class="tweet">
      <header>
        <div class="nameLogo">
          <img src="${avatars} alt="User Avatar" width="30" height="40">
          <h4>${name}</h4>
        </div>
        <p><em>${handle}</em></p>
      </header>
      <p class="tweet-text">${tweetText}</p>
      <footer>
        <p>${timeAgo}</p>
        <div class="flags">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
    return $tweet;
  };

  const renderTweets = (tweets) => tweets.forEach(tweet => $('#tweets-container').prepend(createTweetElement(tweet)));

  const tweetsGetReq = () => {
    $.get('/tweets', function(data) {
      const newTweet = $('.new-tweet');
      //Custom Error handling
      if (data === "" || data === null) {
        newTweet.prepend("<h1 class='error'>Tweet content is not availabe. Please try again later.</h1>");
        return $('.error').slideDown('slow');
      }
      
      $('.error').remove();
      
      renderTweets(data);
    });
  };

  const newTweetHandler = function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetText2 = $(this).find('textarea').val();
    console.log("THIS IS TWEETEXT@: ", tweetText2);
    const tweetText = event.target.text.value;
    const newTweet = $('.new-tweet');
    //Custom Error handling
    if (tweetText.length > 140) {
      if (!$('h1.error')[0]) {
        newTweet.prepend("<h1 class='error'>Tweet content is more than 140 characters. Please shorten it!.</h1>");
        $('.error').slideDown('700');
      }
      return;
    }
    
    $('.error').remove();
    
    $.post('/tweets/', data)
      .then(() => tweetsGetReq())
      .done(() => console.log('The post request worked!'));
  };

  let firstClick = true;
  const textBoxToggler = function() {
    if (firstClick) {
      firstClick = false;
      return $(".new-tweet").attr('style', 'display: none');
    }
    
    $(".new-tweet").slideDown('slow');
    $("#tweet-text").focus();
    firstClick = true;
  };

})(jQuery);

