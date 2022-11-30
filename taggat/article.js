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
const title = urlParams.get("title");
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
    for (let title of dados) {
      buildTitle(title);
    }
    for (let post of dados) {
      buildPost(post);
    }
    for (let data of dados) {
      buildData(data);
    }
  })



  .catch(function (error) {
    console.log(error);
  });


  // funcao titulo 

function buildTitle(_title) {
  // create a new element
  let el = document.createElement("article");
  let myID = "id-" + _title.id;

  el.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  el.innerHTML = `<h1>${_title.title.rendered}</h1>


  
                        
  
                        `;

  // place the new element on the page
  document.querySelector("#titulo").appendChild(el);
  
  console.log("built article", el);
}






  // funcao post 

  function buildPost(_post) {
    // create a new element
    let elpost = document.createElement("article");
    let myID = "id-" + _post.id;
  
    elpost.setAttribute("id", myID);
  
    // use string/template literals to build the HTML object
    elpost.innerHTML = `<p>${_post.content.rendered}</p>
  
  
    
                          
    
                          `;
  
    // place the new element on the page
    document.querySelector("#post").appendChild(elpost);
    
    console.log("built post", elpost);
  }




    // funcao data 

    function buildData(_data) {
      // create a new element
      let eldata = document.createElement("article");
      let myID = "id-" + _data.id;
    
      eldata.setAttribute("id", myID);
    
      // use string/template literals to build the HTML object
      eldata.innerHTML = `<p>${_post.acf.data}</p>
    
    
      
                            
      
                            `;
    
      // place the new element on the page
      document.querySelector("#data").appendChild(eldata);
      
      console.log("built data", eldata);
    }
  