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
  .then(function (dados) {
    //console.log(dados);

    // dados = array of 9 or more posts
    // for each post call a new function with the post content
    for (let post of dados) {
      buildPost(post);
    }

    // run a second loop to change the posts' category names
    for (let post of dados) {
        // after the element span is on the page, run a second fetch (<-- because it may take some time to run)
        // and replace the contents of the spans with the specific classes with their corresponding names (or just use an if…)
        fetchCategory(post.categories[0]);
      }

      // and run a third loop to change the posts' images
      // this one we didn't do in class. same as category, but with an image url fetch
      for (let post of dados) {
        fetchFeaturedMedia(post.id, post.featured_media);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


function buildPost(_post) {
    // create a new element
    let el = document.createElement("article");
    let myID = "id-" + _post.id;
  
    el.setAttribute("id", myID);


 // use string/template literals to build the HTML object
  el.innerHTML = `<figure >
                        <img src="">
                        <figcaption>Caption of image</figcaption>
                        </figure>

                        <!-- inspect the JSON object in the browser to find out the necessary data -->
                        <h1>${_post.title.rendered}</h1>

                        <div class="meta">
                            <span class="data">${_post.acf.data}</span>
                            <span class="local">${_post.acf.local}</span>

                            <!-- this one is trickier… the origina JSON post only has the ID (number) of the category-->
                            <!-- we can place the number as a class "eg ".c14" in the element -->
                            <!-- and later we run a second fetch loop to set the innerHTML of these elements with their name -->
                            <span class="categoria c${_post.categories[0]}">duh… what num?</span>
                        </div>

                        <p>${_post.content.rendered}</p>`;


                    
                        // place the new element on the page
  document.querySelector("#posts").appendChild(el);
  console.log("built article", el);
}
