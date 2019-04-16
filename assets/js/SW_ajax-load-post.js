jQuery(document).ready(function ($) {

  let elementNavigation = {
    buttonLoadMorePost: {
      functionDescryption: "Show more post",
      nameClass: "more-post"
    },
    // buttonLoadAllPost: {
    //   functionDescryption: "Show all post",
    //   nameClass: "all-post"
    // },
  }

  const allPost = parseInt(WK__loadPostAjaxObject.allPost);
  let mainContainer = $('.blog__wrap').attr('data-postpage', 1);
  let blogUrl = WK__loadPostAjaxObject.blogUrl;
  let pageNum = parseInt(WK__loadPostAjaxObject.startPage) + 1;


  let nextLink = WK__loadPostAjaxObject.nextLink;

  if (nextLink === null || nextLink === 0) {
    nextLink = blogUrl + "page/" + pageNum + "/";
  }


  function countActivePost() {
    let activePost = mainContainer.parent().find('.post-card').length;
    return parseInt(activePost);
  }

  function countLeftPost() {
    return parseInt(allPost - countActivePost());
  }

  function initButton(elementNavigation) {

    function drawButton(functionButton) {
      const individualID = 'js-button__' + functionButton;
      let styleDisplayNone = '';
      let buttonText = 'Załaduj więcej wpisów';
      if (functionButton == 'all-post') {
        styleDisplayNone = 'style="display:none;"';
        buttonText = 'Załaduj wszystkie(' + countLeftPost() + ') wpisy';
      }

      return `
              <button id="` + individualID + `" ` + styleDisplayNone + ` type="button">
              ` + buttonText + `
              </button>
      `;
    }

    function drawSeparate() {
      return '<div class="slideshow__button-separator" style="display:none;" ></div>';
    }

    function drawNavigation(elementNavigation) {
      let counter = 0;
      let content = ''
      Object.keys(elementNavigation).forEach(function (item) {
        counter++;
        if (counter > 1) {
          content += drawSeparate();
        }
        content += drawButton(elementNavigation[item].nameClass);
      });

      return content;
    }

    return `
    <div class = "slideshow__button-more slideshow__button-more--center">` +
      drawNavigation(elementNavigation) +
      `</div> `
  };
  if (countActivePost() <= allPost) {
    mainContainer.parent()
      .append('<div class="blog__wrap" data-postpage="' + pageNum + '"></div>')
      .append(initButton(elementNavigation))
  }

  $('#js-button__more-post').click(function () {
    if (countActivePost() <= allPost) {
      $(this).text('Wczytywanie wpisów...');
      $('.blog__wrap[data-postpage="' + pageNum + '"]').addClass('loading icon-after');
      $('.blog__wrap[data-postpage="' + pageNum + '"]').load(nextLink + ' .post',

        function () {
          $('.blog__wrap[data-postpage="' + pageNum + '"]').removeClass('loading icon-after');
          pageNum++;
          nextLink = nextLink.split('page/')[0] + 'page/' + pageNum;
          $('#js-button__more-post').parent().before('<div class="blog__wrap" data-postpage="' + pageNum + '"></div>');

          if (countActivePost() <= allPost) {
            $('#js-button__more-post').text('Załaduj więcej wpisów');
            $('.slideshow__button-separator').show();
            $('#js-button__all-post').show().text('Załaduj wszystkie(' + countLeftPost() + ') wpisy');
          } else {
            $('#js-button__more-post').hide();
          }
        }
      );
    } else {
      $('#js-button__more-post').append('.');
    }
    return false;
  });
});
