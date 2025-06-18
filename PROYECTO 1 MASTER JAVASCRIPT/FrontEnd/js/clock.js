$(() => {
  setInterval(() => {
    let clock = moment().format("h:mm:ss a");

    $("#clock").html(clock);
  }, 1000);

  //   let segundos = 0;
  //   let minutos = 0;
  //   let hora = 0;
  //   setInterval(() => {
  //     segundos++;
  //     if (segundos === 10) {
  //       minutos++;
  //       segundos = 0;
  //       if (minutos === 60) {
  //         hora++;
  //         if (hora > 23) {
  //           hora = 0;
  //         }
  //       }
  //     }
  //     $("#test").html(`<h2>${hora}:${minutos}:${segundos}</h2>`);
  //   }, 1000);
});
