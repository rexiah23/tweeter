// import $ from "jquery";

$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea").on('input', function(event) {
    
    const input = $(this).val();
    const currCharCount = $(this).closest("form").find("output")
    currCharCount.val(140 - input.length);
    
    if (currCharCount.val() < 0) {
      currCharCount.addClass("maxedWordCount");
    }

    if (currCharCount.val() >= 0) {
      currCharCount.removeClass("maxedWordCount");
    }
  })

  $(".tweet").on('mouseover', function(event) {
    $(this).addClass("addShadow");
  });

  $(".tweet").on('mouseleave', function(event) {
    $(this).removeClass("addShadow");
  })

  $(".flags i").on('mouseover', function(event) {
    $(this).addClass("highlightFlags");
  });

  $(".flags i").on('mouseleave', function(event) {
    $(this).removeClass("highlightFlags");
  })
});

