console.log("hello single page mode");


// this gets the URL address bar
const queryString = window.location.search;


const urlParams = new URLSearchParams(queryString);


//apanhar parametro do url, aka numero do post.
const post = urlParams.get("post");


// Fetch de um post (construir a edenreço do JSON com o parâmetro da URL )
let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?include=403";


// fetch
fetch(url)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
  
    for (let title of dados) {
      buildTitle(title);
    }
    for (let mainpost of dados) {
      buildPost(mainpost);
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
  

     // funcao outras entradas

function buildOutras(_outras) {
  // create a new element
  let elOutras = document.createElement("article");
  let myID = "id-" + _outras.id;

  elOutras.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  elOutras.innerHTML = `<h1>${_outras.acf.entradas_relacionadas}</h1>


  
                        
  
                        `;

  // place the new element on the page
  document.querySelector("#outras").appendChild(elOutras);
  
  console.log("built outras", elOutras);
}




    
    


