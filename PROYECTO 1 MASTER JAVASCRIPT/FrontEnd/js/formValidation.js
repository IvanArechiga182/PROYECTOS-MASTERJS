$(() => {
  console.log("Form validation");
});

$.validate({
  lang: "es",
});

$("#user-birthdate").datepicker({
  dateFormat: "dd-mm-yy",
});

$("#contact-form").on("submit", function (event) {
  event.preventDefault();
  if ($(this).isValid()) {
    alert("Formulario válido");
  } else {
    alert("Corrige los errores");
  }
});
