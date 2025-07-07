const $content = $("#content");
const $languageBtn = $("#selectLanguage").find("button");

$languageBtn.on("click", function () {
  let _$this = $(this);
  let thisLang = _$this.attr("id");
  console.log(thisLang);

  _$this.siblings().removeClass("selected");

  if (!_$this.hasClass("selected")) {
    _$this.addClass("selected");

    $content.removeClass("eng kor").addClass(thisLang);
  }
});