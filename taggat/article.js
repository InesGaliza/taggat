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

// ANIMAÇÃO DO MENU

function menu(){
  let hamMenu = document.querySelector(".linhasMenu");
  let menuAberto = document.querySelector('.itensMenu');

  hamMenu.addEventListener('click', function abreFechaMenu(){
    if (menuAberto.style.left === "0%"){
      menuAberto.style.left = "100%";
    } else if (menuAberto.style.left = "100%"){
      menuAberto.style.left = "0%";
    }
    menuAberto.style.transition = 1000 + "ms";
  });

  menuAberto.addEventListener('click', function fechaMenu(){
    if (menuAberto.style.left === "0%"){
      menuAberto.style.left = "100%";
    }
  });
};



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










  for (let outras of dados) {
    buildOutras(outras);
  }

//loop de categorias
  for (let cat of dados) {
    // after the element span is on the page, run a second fetch (<-- because it may take some time to run)
    // and replace the contents of the spans with the specific classes with their corresponding names (or just use an if…)
    fetchCategory(cat.categories[0]);
  }



  for (let categorias of dados) {
    buildCategorias(categorias);
  }




    //loop de etiquetas
    for (let etik of dados) {
      // after the element span is on the page, run a second fetch (<-- because it may take some time to run)
      // and replace the contents of the spans with the specific classes with their corresponding names (or just use an if…)
      fetchTag(etik.tags[0]);
    }


      
  for (let tags of dados) {

    buildEtiquetas(tags);
    console.log('bulding tags');
  }





  //mini fotos
    for (let media of dados) {
      fetchFeaturedMedia(media.id, media.featured_media);
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
      eldate.innerHTML = `<p>${_date.acf.data}</p>
      
      
      `;
    
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





    function buildEtiquetas(_tags) {


      // create a new element
      let elEtiquetas = document.createElement("article");
      
      let myID = "id-" + _tags.id;
      
    
      elEtiquetas.setAttribute("id", myID);
    
     
      elEtiquetas.innerHTML = `
      <span class= "categoria t${_tags.tags[0]}" >duh… what num?</span>
      
                            `;
    
      // place the new element on the page
      document.querySelector("#etiquetas").appendChild(elEtiquetas);
      
      console.log("built etiquetas", elEtiquetas);
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








//etiquetas fetch  ---------------------------------

function fetchTag(_etik_num) {
  console.log("fetching tags names");

  // this will be the text string name to insert in the HTML span element(s)
  let etiquetas_name = "";

  // this is the base URL to fetch the tags names
  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/tags/";


  url += _etik_num;


  fetch(url)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      // define a new text string to build the class name with the number
      let myClass = ".t" + _etik_num;

      //console.log("my class", myClass);

      // grab all elements with that class in the DOM (<-- querySelector all it's an array, remember?)
      // you could also just grab the last one from the array… better method!
      let elt = document.querySelectorAll(myClass);

      // in each one of the elements
      // change the inner text/html for the name provided by wordpress for that specific category number
      // remember to always inspect the JSON object to find out what property you need…
      for (let elEtiquetas of elt) {
        elEtiquetas.innerHTML = dados.name;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
  















//TUDO DAs cATEGORIAS E FETCH---------------------------------------------






//funcao categorias

function buildCategorias(_categorias) {
  // create a new element
  let elcat = document.createElement("article");
  let myID = "id-" + _categorias.id;

  elcat.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  elcat.innerHTML = `

  <span class="categoria c${_categorias.categories[0]}">duh… what num?</span>
  
                        
  
                        `;

  // place the new element on the page
  document.querySelector("#cats").appendChild(elcat);
  
  console.log("built cats", elcat);
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





//MEDIA____________________________________________________FOTOS




async function fetchFeaturedMedia(_id, _media) {
  console.log("fetching media");
  // console.log("id", _id);
  // console.log("media num", _media);

  // fetch method is similar to previous
  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/media/";
  url += _media;
  // console.log("featured media fetch url", url);

  // we will use this to store the URL  when it arrives
  let mySrc = "";

  // first difference from "normal" fetch
  // either const or let will store the response…
  // only after "waiting" for it to arrive
  // it means that all the code "halts and waits" for this before proceeeding
  const resposta = await fetch(url);

  // check for errors (URL not OK)
  if (!resposta.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // if a promise is sent, get the data "after waiting for it to arrive" into a new JSON variable/object
  const dados = await resposta.json();

  //   <!-- inspect the JSON object in the browser to find out the necessary data -->
  // eg.: https://nit.fba.up.pt/dev/wp-json/wp/v2/media/404

  // using dados.guid.rendered will return the full-size image src url
  // e.g.: https://nit.fba.up.pt/dev/wp-content/uploads/2022/11/Museu-da-Imprensa.jpg

  // using dados.media_details.sizes.thumbnail.source_url will return predefined smaller sizes
  // eg. https://nit.fba.up.pt/dev/wp-content/uploads/2022/11/Museu-da-Imprensa-300x121.jpg

  mySrc = dados.media_details.sizes.thumbnail.source_url;
  console.log("featured media scr url", mySrc);

  // get the article > figure > img and set the src
  let myID = "#id-" + _id;
  let myElMedia = document.querySelector(myID);
  myElMedia.children.item(0).children.item(0).setAttribute("src", mySrc);
}
