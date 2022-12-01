console.log("hello single page mode");


// this gets the URL address bar
const queryString = window.location.search;


const urlParams = new URLSearchParams(queryString);


//apanhar parametro do url, aka numero do post.
const post = urlParams.get("post");


// Fetch de um post (construir a edenreço do JSON com o parâmetro da URL )
let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?include=" + post;


// before the posts
// fetch the post tags with names

// https://nit.fba.up.pt/dev/wp-json/wp/v2/tags/


// async function fetchTags() {
//   const response = await fetch('https://nit.fba.up.pt/dev/wp-json/wp/v2/tags/');
//   const tags = await response.json();
//   return tags;
// }

// fetchTags().then(function (dados) {
  
//   for (let tag of dados) {
    
//     // console.log("tags", tag);

//     let newTag;
//     newTag = {id: tag.id, name: tag.name};

//     tagnames.push(newTag);
//   }
//   console.log("total tgnames",tagnames);
  
// });



//fetch de imagens
let imagens= "https://nit.fba.up.pt/dev/wp-json/wp/v2/media/";


fetch(url)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    // não esquecer que devolve um array (só com 1 post)
    for (let mainpost of dados) {
      buildPost(mainpost);
    }
  for (let title of dados) {
    buildTitle(title);
  }
 
  for (let date of dados) {
    buildData(date);
  }
  for (let local of dados) {
    buildLocal(local);
  }
  for (let etiquetas of dados) {

    buildEtiquetas(etiquetas);
    console.log('bulding etiquetas');
  }

  for (let outras of dados) {
    buildOutras(outras);
  }


//loop de categorias
  for (let cat of dados) {
    // after the element span is on the page, run a second fetch (<-- because it may take some time to run)
    // and replace the contents of the spans with the specific classes with their corresponding names (or just use an if…)
    fetchCategory(cat.categories[0]);
  }


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

  function buildPost(_mainpost) {
    // create a new element
    let elmainpost = document.createElement("article");
    let myID = "id-" + _mainpost.id;
  
    elmainpost.setAttribute("id", myID);
  
    // use string/template literals to build the HTML object
    elmainpost.innerHTML = `<p>${_mainpost.content.rendered}</p>


    <span class="categoria c${_mainpost.categories[0]}">duh… what num?</span>
    
    `;
  
    // place the new element on the page
    document.querySelector("#post").appendChild(elmainpost);
    
    console.log("built post", elmainpost);
  }






    // funcao data 

    function buildData(_date) {
      // create a new element
      let eldate = document.createElement("article");
      let myID = "id-" + _date.id;
    
      eldate.setAttribute("id", myID);
    
      // use string/template literals to build the HTML object
      eldate.innerHTML = `<p>${_date.acf.data}</p>`;
    
      // place the new element on the page
      document.querySelector("#data").appendChild(eldate);
      
      console.log("built data", eldate);
    }
  


    // funcao local 

    function buildLocal(_local) {
      // create a new element
      let ellocal = document.createElement("article");
      let myID = "id-" + _local.id;
    
      ellocal.setAttribute("id", myID);
    
      // use string/template literals to build the HTML object
      ellocal.innerHTML = `<p>${_local.acf.local}</p>
    
    
      
                            
      
                            `;
    
      // place the new element on the page
      document.querySelector("#local").appendChild(ellocal);
      
      console.log("built local", ellocal);
    }


    function buildEtiquetas(_post) {

      // console.log("post", _post);
      console.log("tags", _post.tags);

      // create a new element
      let elEtiquetas = document.createElement("article");
      
      let myID = "id-" + _post.id;
      

      elEtiquetas.setAttribute("id", myID);

      // let tagNames = "";
    
      // for(let i = 0; i < _post.tags.length; i++) {
       
      //   console.log("tag…", _post.tags[i]);

      //   for(let k = 0; k < tagnames.length; k++ ) {
      //     if( tagnames[k].id == _post.tags[i]) {
      //       tagNames += tagnames[k].name+", "; 
      //     }
      //   }

        
      // }

      // console.log("tagNames", tagNames);

      // use string/template literals to build the HTML object
      elEtiquetas.innerHTML = `
                                <p> by name: ${ "s"}</p>
                            `;
    
      // place the new element on the page
      document.querySelector("#etiquetas").appendChild(elEtiquetas);
      
      console.log("built etiquetas", elEtiquetas);
    }
  




// funcao categorias


function buildCategory(_category) {
  // create a new element
  let elcategory = document.createElement("article");
  let myID = "id-" + _category.id;

  elcategory.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  elcategory.innerHTML = `<p>${_mainpost.content.rendered}</p>


  <span class="categoria c${_mainpost.categories[0]}">duh… what num?</span>
  
  `;

  // place the new element on the page
  document.querySelector("#post").appendChild(elmainpost);
  
  console.log("built post", elmainpost);
}








  // funcao outras entradas

function buildOutras(_outras) {
  // create a new element
  let elOutras = document.createElement("article");
  let myID = "id-" + _outras.id;

  elOutras.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  elOutras.innerHTML = `

  <p>${_outras.acf.entradas_relacionadas}</p>
  
                        
  
                        `;

  // place the new element on the page
  document.querySelector("#outras").appendChild(elOutras);
  
  console.log("built outras", elOutras);
}

// CATEGORIAS FETCH --------------------------------


function fetchCategory(_cat_num) {
  console.log("fetching categories names");

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
      for (let elcat of els) {
        elcat.innerHTML = dados.name;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}



