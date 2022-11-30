console.log("hello single page mode");

// reading parameters from the search / URL bar
// https://www.sitepoint.com/get-url-parameters-with-javascript/

// this gets the URL address bar
const queryString = window.location.search;

// this breaks down the URL and gets the stuff after the HTML page
// eg. the string "v=0AsAjHPupKQ" after "https://www.youtube.com/watch?" in a youtube address
const urlParams = new URLSearchParams(queryString);
//console.log(urlParams);

// the urlParams returns an object. Get a specific "property" (AKA variable) of the object (URL)
// eg. the "403" in the "http://127.0.0.1:5500/single.html?post=403" URL
const post = urlParams.get("post");
//console.log(post);

// fazer o fetch do post específico passado no URL n.º 403 do JSON do Wordpress
// só um post/objeto JSON:
// https://nit.fba.up.pt/dev/wp-json/wp/v2/posts/403
// ligeiramente diferente do nosso método

// Método identico ao anterior Fetch de um array com apenas um post ou com posts específicos
// https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?include=403 (array só com um)
// https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?include=403,397

// Fetch de um post (construir a edenreço do JSON com o parâmetro da URL )
let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?include=403";

// see the files from class 6 for fetch operations
fetch(url)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    // não esquecer que devolve um array (só com 1 post)
    for (let post of dados) {
      buildPost(post);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

function buildPost(_post) {
  // create a new element
  let el = document.createElement("article");
  let myID = "id-" + _post.id;

  el.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  el.innerHTML = `<h1>${_post.title.rendered}</h1>

  <div> </div>
  
                        
  
                        `;

  // place the new element on the page
  document.querySelector("#titulo").appendChild(el);
  
  console.log("built article", el);
}
