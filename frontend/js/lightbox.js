function lightbox(el){
  var $overlay = $("#lightbox-overlay,#lightbox-overlay-cross");
  var $parent = $(el);
  var $el = $($(el).children("img, video")[0]);
  var offset = $el.offset();
  var scrollEl = document.scrollingElement;
  var width = $el.width();
  var height = $parent.get(0).clientHeight;
  var isWide = window.innerHeight < window.innerWidth;
  var isElWide = height < width;
  var padding = 8;

  if($el.hasClass("lightboxed")) return;

  $el
    .css("top", offset.top-scrollEl.scrollTop)
    .css("left", offset.left)
    .css("width", width)
    .css("height", height)
    .attr("controls", "")
  ;
  setTimeout(()=>{
    $el
      .addClass("lightboxed")
      .addClass("active")
      .animate((isWide && !isElWide ?
        {
          height: window.innerHeight-padding*2,
          width: width * (window.innerHeight / height)-padding*2
        } :
        {
          height: height * (window.innerWidth / width)-padding*2,
          width: window.innerWidth-padding*2
        }
      ), 250)
    ;
    $overlay
      .one("click", ()=>{
        $(scrollEl).css("overflow", "auto");
        $el
          .removeClass("active")
          .removeAttr("controls")
          .animate({height: height, width: width}, 200, ()=>{
            setTimeout(()=>{
              $el
                .finish()
                .removeAttr("style")
                .removeClass("lightboxed")
              ;
            }, 500);
          })
        ;
        $overlay.removeClass("active");
      })
    ;
  }, 50);

  $overlay.addClass("active");
  $(scrollEl).css("overflow", "hidden");
}
