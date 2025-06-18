$(() => {
  console.log("jQuery esta cargado y listo para usar");

  if (window.location.href.indexOf("index") > -1) {
    $(function () {
      $(".bxslider").bxSlider({
        mode: "fade",
        captions: true,
        slideWidth: 1200,
        controls: true,
      });
    });

    let posts = [
      {
        title: "Prueba de titulo 1",
        date: `Publicado el día ${moment().day()} de ${moment().format(
          "MMMM"
        )} de ${moment().format("YYYY")}`,
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia blanditiis fugit maiores fuga labore laboriosam, nam odit provident suscipit minus officia rerum numquam eos eveniet amet beatae hic repellat fugiat repudiandae quibusdam sed similique alias. Qui cupiditate praesentium distinctio repellat voluptate quidem commodi, animi ipsum illum quibusdam odio, dicta molestiae?",
      },
      {
        title: "Prueba de titulo 2",
        date: `Publicado el día ${moment().day()} de ${moment().format(
          "MMMM"
        )} de ${moment().format("YYYY")}`,
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia blanditiis fugit maiores fuga labore laboriosam, nam odit provident suscipit minus officia rerum numquam eos eveniet amet beatae hic repellat fugiat repudiandae quibusdam sed similique alias. Qui cupiditate praesentium distinctio repellat voluptate quidem commodi, animi ipsum illum quibusdam odio, dicta molestiae?",
      },
      {
        title: "Prueba de titulo 3",
        date: `Publicado el día ${moment().day()} de ${moment().format(
          "MMMM"
        )} de ${moment().format("YYYY")}`,
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia blanditiis fugit maiores fuga labore laboriosam, nam odit provident suscipit minus officia rerum numquam eos eveniet amet beatae hic repellat fugiat repudiandae quibusdam sed similique alias. Qui cupiditate praesentium distinctio repellat voluptate quidem commodi, animi ipsum illum quibusdam odio, dicta molestiae?",
      },
      {
        title: "Prueba de titulo 4",
        date: `Publicado el día ${moment().day()} de ${moment().format(
          "MMMM"
        )} de ${moment().format("YYYY")}`,
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia blanditiis fugit maiores fuga labore laboriosam, nam odit provident suscipit minus officia rerum numquam eos eveniet amet beatae hic repellat fugiat repudiandae quibusdam sed similique alias. Qui cupiditate praesentium distinctio repellat voluptate quidem commodi, animi ipsum illum quibusdam odio, dicta molestiae?",
      },
      {
        title: "Prueba de titulo 5",
        date: `Publicado el día ${moment().day()} de ${moment().format(
          "MMMM"
        )} de ${moment().format("YYYY")}`,
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia blanditiis fugit maiores fuga labore laboriosam, nam odit provident suscipit minus officia rerum numquam eos eveniet amet beatae hic repellat fugiat repudiandae quibusdam sed similique alias. Qui cupiditate praesentium distinctio repellat voluptate quidem commodi, animi ipsum illum quibusdam odio, dicta molestiae?",
      },
    ];

    let postsDiv = $("#posts");

    posts.forEach((item, index) => {
      const post = `
     <article class="post">
            <h2>${item.title}</h2>
            <span id="fecha-post">${item.date}</span>
            <p>
              ${item.content}
            </p>
            <a href="#" class="see-more-button">Leer más</a>
          </article>
    `;

      postsDiv.append(post);
    });
  }

  let loginForm = $("#login-usuario form");

  loginForm.submit(function (e) {
    sessionStorage.setItem("username", $("#userName").val());
    let userName = sessionStorage.getItem("username");
    alert(`Se inicio sesion correctamente, bienvenido ${userName}`);
  });

  if (sessionStorage.getItem("username") == null) {
    $("#about p").html("Bienvenido, invitado");
    $("#login-usuarii").show();
  } else {
    $("#about p").html(`Bienvenido, ${sessionStorage.getItem("username")}`);
    $("#login-usuario").hide();
    $("#about").append("<a href='#' id='logout-button'>Cerrar sesion</a>");
  }

  $("#logout-button").click(() => {
    sessionStorage.clear();
    location.reload();
  });
});
