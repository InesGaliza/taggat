//CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", init);
let urlBase;

function init() {
  console.log("está pronto!");
  vaiBuscar();
}

function vaiBuscar() {
    //DECLARAR O URL DO WORDPRESS
    urlBase = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?categories=13";

    //1ª RONDA DE FETCH
    fetch(urlBase)
    .then(function (resposta) {
      return resposta.json();
    })

    .then(function (dados) {
    console.log(dados);
    
    for (let post of dados) {
        buildPost(post);
    }
    
    for (let post of dados) {
        // after the element span is on the page, run a second fetch (<-- because it may take some time to run)
        // and replace the contents of the spans with the specific classes with their corresponding names (or just use an if…)
        fetchCategory(post.categories[0]);
    }
    })

    .catch(function (error) {
        console.log(error);
    })

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
    //console.log("o Artigo está constrído!", el);
  }

  function fetchCategory(_cat_num) {
    //console.log("fetching categories names");
  
    // this will be the text string name to insert in the HTML span element(s)
    let category_name = "";
  
    // this is the base URL to fetch the category names
    let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/categories/";
  
    // add the category number
    // the final url should be something like this
    // https://nit.fba.up.pt/dev/wp-json/wp/v2/categories/14
    url += _cat_num;
  
    fetch(url)
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (dados) {
        // define a new text string to build the class name with the number
        let myClass = ".c" + _cat_num;
  
        //console.log("my class", myClass);
  
        // grab all elements with that class in the DOM (<-- querySelector all it's an array, remember?)
        // you could also just grab the last one from the array… better method!
        let els = document.querySelectorAll(myClass);
  
        // in each one of the elements
        // change the inner text/html for the name provided by wordpress for that specific category number
        // remember to always inspect the JSON object to find out what property you need…
        for (let el of els) {
          el.innerHTML = dados.name;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }