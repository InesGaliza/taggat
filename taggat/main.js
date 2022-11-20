// use DOM load event listener to wait for content on page
addEventListener("load", init);
let urlBase;

function init() {
  console.log("ready when you are!");
  vaiBuscar();
}

function vaiBuscar() {
    //declarar o URL > Wordpress
    urlBase = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?categories=13";

    //Fet
    fetch(urlBase)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
    console.log(dados);
    })
}
