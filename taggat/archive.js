// CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", goRun);


function goRun() {
  console.log("está pronto!");

  // FUNÇÃO PARA FAZER O FETCH
  vaiBuscar();
}

/*------------------------------------------------------------------------------------------------------------------------------*/

function vaiBuscar() {
    // DECLARAR O URL DO WORDPRESS
    let urlBase = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?categories=13";

    // 1ª RONDA DE FETCH
    fetch(urlBase)
    .then(function (resposta) {
      return resposta.json();
    })

    .then(function (dados) {
    console.log(dados);
    
    // PARA CADA ENTRADA DO WORDPRESS (CADA OBJETO DO ARRAY) CONTROI UM ARTIGO (FUNÇÃO)
    for (let post of dados) {
        construirArtigo(post);
    }


    
    // DEPOIS DA CONSTRUÇÃO DO ARTIGO, PARA CADA ENTRADA DO WORDPRESS, CORRE UM SEGUNDO FETCH (FUNÇÃO)
    for (let post of dados) {
        fetchCategoria(post.categories[0]);
    }

    // DEPOIS, CORRER UM TERCEIRO FETCH
    for (let post of dados) {
      fetchImagens(post.id, post.featured_media);
    }

    criarimagens();

    })

    .catch(function (error) {
        console.log(error);
    })
}

function criarimagens() {
  console.log ("estou a criar");



  // vai buscar o #list


let alvo = document.querySelector('#list');


  // no click do #list

// alvo.addEventListener('click', function(event){
//   let myTarget = event.target;

//     // obtem o target clicado (do evento)
//   console.log(myTarget);

//   myTarget.children[0].style.display = "block";
// });


 
$("#list article").on("click", function () {
  $("article").children("figure").css("display", "none");
  $(this).children("figure").toggle();
  $(this).children("figure").css("position","absolute");


});


//$("h3#openslide").click ( function(){$("ul#nav").toggle("show"); 



  // target filho (figure) = block
} //


/*------------------------------------------------------------------------------------------------------------------------------*/

// FUNÇÃO PARA CONSTRUIR OS ARTIGOS
function construirArtigo(_post) {
    // CRIAR UM NOVO ELEMENTO > O ARTIGO
    let el = document.createElement("article");
    let myID = "id-" + _post.id;
  
    el.setAttribute("id", myID);
  
    // UTLIZAR STRING / TEMPLATE LITERALS PARA CONSTRUIR O OBJETO HTML
    el.innerHTML = `<figure >
                          <img src="">
                    </figure>
  
                          <!-- PARA ENCONTRAR OS DADOS NECESSÁRIOS, É NECESSÁRIO INSPECIONAR O OBJETO JSON NO BROWSER -->
                          <a href="article.htm?post=${_post.id}"><h1>${_post.title.rendered}</h1></a>
  
                          <div class="meta">
                              <span class="data">${_post.acf.data}</span>
                              <!-- <span class="local">${_post.acf.local}</span> -->
  
                              <!-- O POST ORIGINAL DO JSON SÓ TEM O ID (número) DA CATEGORIA -->
                              <!-- PODEMOS POR O NÚMERO DE CATEGORIA COMO UMA CLASSE -->
                              <!-- DEPOIS, FAZENDO UM SEGUNDO FETCH LOOP, DEFINIMOS O INNERHTML DESTES ELEMENTOS -->
                              <!-- <span class="categoria c${_post.categories[0]}">duh… what num?</span> -->
                          </div>
  
                          <!-- <p>${_post.content.rendered}</p> -->`;
  
    // COLOCAR O OBJETO CRIADO NO ARTIGO CRIADO
    document.querySelector("#list").appendChild(el);


    //console.log("o Artigo está constrído!", el);
  }

/*------------------------------------------------------------------------------------------------------------------------------*/

// FUNÇÃO QUE CORRE O SEGUNDO FETCH
function fetchCategoria(_cat_num) {
    //console.log("fetching categories names!");
  
    // ESTE É O URL PARA IR BUSCAR OS NOMES DAS CATEGORIAS
    let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/categories/";
  

    // O URL FINAL DEVE SER ALGO DO GÉNERO...
    // https://nit.fba.up.pt/dev/wp-json/wp/v2/categories/14
    // ADICIONAR O NÚMERO DA CATEGORIA AO URL
    url += _cat_num;
  
    fetch(url)
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (dados) {
        // DEFINIR UM NOVO TEXT STRING PARA CONSTRUIR O NOME DA CALSSE
        let myClass = ".c" + _cat_num;
        //console.log("my class", myClass);
  
        // NO DOM, SELECIONAR TODOS OS ELEMENTOS COM A CLASSE (<-- querySelectorAll > ARRAY)
        let els = document.querySelectorAll(myClass);
  
        // EM CADA ELEMENTO
        // MUDAR O INNERHTML PARA O NOME DA CATEGORIA DESSE NÚMERO (WORDPRESS)
        for (let el of els) {
          el.innerHTML = dados.name;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
/*------------------------------------------------------------------------------------------------------------------------------*/

// FUNÇÃO QUE CORRE O TERCEIRO FETCH
async function fetchImagens(_id, _media) {
  console.log("estou fetchar o media!");
  //console.log(_id);
  //console.log(_media);

  // ESTE É O URL PARA IR BUSCAR O MEDIA (IMAGENS)
  let mediaURL = "https://nit.fba.up.pt/dev/wp-json/wp/v2/media/";
  // ADICIONAR O NÚMERO DO MEDIA AO URL
  mediaURL += _media;
  //console.log(mediaURL);

  let mySrc = "";

  const resposta = await fetch(mediaURL);

  if (!resposta.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const dados = await resposta.json();

  mySrc = dados.media_details.sizes.thumbnail.source_url;
  //console.log("featured media scr url", mySrc);

  let myID = "#id-" + _id;
  let myEl = document.querySelector(myID);
  myEl.children.item(0).children.item(0).setAttribute("src", mySrc);
}








