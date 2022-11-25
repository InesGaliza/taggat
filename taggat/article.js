// use DOM load event listener to wait for content on page
addEventListener("load", init);


function init() {
  console.log("ready when you are!");
  // ehn page ready get the JSON content (timeline posts)
  getSome();
}



function getSome() {
  //console.log("getting json");

  // JSON url endpoint (wordpress timeline category = 13)
  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?categories=13";

  // see the files from class 6 for fetch operations
  fetch(url)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (titulodados) {
      //console.log(dados);

      // dados = array of 9 or more posts
      // for each post call a new function with the post content
      for (let post of titulodados) {
        buildTitle(post);
      }
      // run a second loop to change the posts' category names

      // and run a third loop to change the posts' images

    })
    .catch(function (error) {
      console.log(error);
    });
}



// this function is responsible for
// 1. creating a new element for each post in the JSON
// 2. getting the relevant content of the post
// 3. note that some content is NOT inside the JSON --> you have to use a second, or third fetch to get them
// Main (top-level) Category: Timeline = 13
// Timeline sub-categories: Artefactos = 37; Locais = 52; Pessoas = 14
// Other "second-level-fetch" data is the feature image. (see below)

// when calling the function we pass the specific "_post" as an argument
// the function receives the "_post" and…

function buildTitle(_post) {
  // create a new element
  let el = document.createElement("article");
  let myID = "id-" + _post.id;






  el.setAttribute("id", myID);

  // titulo insert
  el.innerHTML = `
               
  

                        <!-- inspect the JSON object in the browser to find out the necessary data -->
                        <h1>${_post.title.rendered}</h1>

                        <span class="data">${_post.acf.data}</span>
                        <span class="local">${_post.acf.local}</span>


                       `;



  // place the new element on the page
  document.querySelector("#titulo").appendChild(el);
  console.log("built article", el);

}






