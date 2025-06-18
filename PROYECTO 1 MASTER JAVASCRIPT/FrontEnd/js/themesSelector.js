let greenThemeButton = $("#to-green");
let blueThemeButton = $("#to-blue");
let redThemeButton = $("#to-red");
let themeReference = $("#theme");

greenThemeButton.click(function () {
  themeReference.attr("href", "../styles/greenStyle.css");
});

blueThemeButton.click(function () {
  themeReference.attr("href", "../styles/blueStyle.css");
});

redThemeButton.click(function () {
  themeReference.attr("href", "../styles/redStyle.css");
});

let scrollUpButton = $("#scroll-up");

scrollUpButton.click(function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    500
  );

  return false;
});
