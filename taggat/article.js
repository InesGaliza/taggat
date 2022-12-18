// CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", inicio);

function inicio() {
  console.log("ready when you are!");

  // FUNÇÃO PARA FAZER O FETCH  
  getSome();
  // AMINAÇÃO DO MENU
  menu();
}

/*------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------*/

// MENU
// ANIMAÇÃO DO MENU
function menu(){
  let hamMenu = document.querySelector(".linhasMenu");
  let menuAberto = document.querySelector('.itensMenu');

  // AO CLICKAR NO BOTÃO DO MENU E A CAIXA ESTIVER "ABERTA || 0% À ESQUERDA"
  // A CAIXA FICA "FECHADA || 100% À ESQUERDA"
  hamMenu.addEventListener('click', function abreFechaMenu(){
    if (menuAberto.style.left === "0%"){
      menuAberto.style.left = "100%";
    
    // AO CLICKAR NO BOTÃO DO MENU E A CAIXA ESTIVER "FECHADA || 100% À ESQUERDA"
    // A CAIXA FICA "ABERTA || 0% À ESQUERDA"
    } else if (menuAberto.style.left = "100%"){
      menuAberto.style.left = "0%";
    }

    // ANIMAÇAÇÃO || TRANSIÇÃO DO MENU ABRIR E FECHAR
    menuAberto.style.transition = 1000 + "ms";

    // ADIÇÃO DE CLASSE PARA FAZER COM QUE O HAMGURGUER SE TORNE UM X
    // CRÉDITOS - https://www.youtube.com/watch?v=KCjsdMgl84g
    hamMenu.classList.toggle('ativado');
  });

  // AO CARREGAR NA CAIXA QUE CONTÉM A LISTA NAVEGÁVEL, O MENU FECHA
  menuAberto.addEventListener('click', function fechaMenu(){
    if (menuAberto.style.left === "0%"){
      menuAberto.style.left = "100%";
    }
    hamMenu.classList.toggle('ativado');
  });
};

/*------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA O FETCH
function getSome() {
  // FETCH DE TODOS OS OBJETOS
  // DECLARAR O URL DO WORDPRESS
  let urlBase = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?categories=13";
  // 1ª RONDA DE FETCH
  fetch(urlBase)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
  console.log("o array original:", dados);
  //REORGANIZAR O ARRAY PELO ANO (ACF.DATA)
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  //https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-date-property
  let rearranjedArr = dados.sort(
    (objA, objB) => Number(objA.acf.data) - Number(objB.acf.data),
  );
  console.log("o array organizado:", rearranjedArr);
  })
  .catch(function (error) {
    console.log(error);
})

/*------------------------------------------------------------------------------------------------------------------------------*/
  // OBTER O URL
  const queryString = window.location.search;
  //console.log('inicio', queryString);
  const urlParams = new URLSearchParams(queryString);
  // APANHAR PARAMENTRO DO URL, AKA NUMERO DO POST
  const post = urlParams.get("post");

  // FETCH DE UM POST (CONSTRUIR ENDEREÇO DO JSON COM O PARÂMENTRO DO URL)
  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/posts?include=" + post;
  //FETCH DE IMAGENS
  let imagens= "https://nit.fba.up.pt/dev/wp-json/wp/v2/media/";

  // FETCH DE UM OBJETO
  fetch(url)
  .then(function (resposta) {
    return resposta.json();
  })
  .then(function (dados) {
    // DEVOLVE UM ARRAY (SÓ COM 1 POST)!!
    // CONSTROI UM ARTIGO (FUNÇÃO)
    for (let mainpost of dados) {
      buildPost(mainpost);
    }
    // CONSTROI TITULO (FUNÇÃO)
    for (let title of dados) {
      buildTitle(title);
    }
    // CONSTROI A DATA (FUNÇÃO)
    for (let date of dados) {
      buildData(date);
    }
    // CONSTROI O LOCAL (FUNÇÃO)
    for (let local of dados) {
      buildLocal(local);
    }
    // FETCH FOTOGRFAIAS
    for (let media of dados) {
      fetchFeaturedMedia(media.id, media.featured_media);
    }
    // CONSTROI OUTRAS ENTRADAS (FUNÇÃO)
    for (let outras of dados) {
      buildOutras(outras);
    }   
    // LOOP DE CATEGORIAS
    for (let cat of dados) {
      // DEPOIS DO ELEMENTO TER DADO SPAN, CORRER UM SEGUNDO FETCH
      // and replace the contents of the spans with the specific classes with their corresponding names (or just use an if…)
      fetchCategory(cat.categories[0]);
    }
    for (let categorias of dados) {
      buildCategorias(categorias);
    }
    // LOOP DE ETIQUETAS
    for (let etik of dados) {
      // CORRER UM TERCEIRO FETCH
      fetchTag(etik.tags[0]);
    }
    for (let tags of dados) {
      buildEtiquetas(tags);
      //console.log('bulding tags');
    }
})
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR OS TÍTULOS
function buildTitle(_title) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let el = document.createElement("article");
  let myID = "id-" + _title.id;

  el.setAttribute("id", myID);

  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  el.innerHTML = `<h1>${_title.title.rendered}</h1>`;
  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#titulo").appendChild(el);
  //console.log("built article", el);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR O POST
function buildPost(_mainpost) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let elmainpost = document.createElement("article");
  let myID = "id-" + _mainpost.id;
  
  elmainpost.setAttribute("id", myID);
  
  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  elmainpost.innerHTML = `<p>${_mainpost.content.rendered}</p>`;
  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#post").appendChild(elmainpost);
  //console.log("built post", elmainpost);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR A DATA
function buildData(_date) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let eldate = document.createElement("article");
  let myID = "id-" + _date.id;
    
  eldate.setAttribute("id", myID);
    
  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  eldate.innerHTML = `<p>${_date.acf.data}</p>`;
  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#data").appendChild(eldate);
  //console.log("built data", eldate);
    }
  
/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR O LOCAL
function buildLocal(_local) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let ellocal = document.createElement("article");
  let myID = "id-" + _local.id;
    
  ellocal.setAttribute("id", myID);
    
  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  ellocal.innerHTML = `<p>${_local.acf.local}</p>`;
  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#local").appendChild(ellocal);
  //console.log("built local", ellocal);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA O FETCH DE ETIQUETAS
function fetchTag(_etik_num) {
  //console.log("fetching tags names");

  // TEXT STRING PARA INSERIR O ELEMENTO(S) HTML
  let etiquetas_name = "";
  // BASE URL PARA FETCH AS TAGS NAMES
  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/tags/";
  url += _etik_num;

  fetch(url)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      // DEFENIR UMA NOVA TEXT STRING PARA CONSTRUIR A CLASS C/ NÚM.
      let myClass = ".t" + _etik_num;
      //console.log("my class", myClass);

      // QUERYSELECTORALL NA CLASSE AFETADA NO DOM
      let elt = document.querySelectorAll(myClass);

      // EM CADA UM DOS ELEMENTOS, MUDA O TEXT/HTML PELO NOME QUE O WORDPRESS DÁ PARA A ETIQUETA
      for (let elEtiquetas of elt) {
        elEtiquetas.innerHTML = dados.name;
        //console.log(elEtiquetas.innerHTML)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR AS ETIQUETAS
function buildEtiquetas(_tags) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let elEtiquetas = document.createElement("article");
  let myID = "id-" + _tags.id;
      
  elEtiquetas.setAttribute("id", myID);
    
  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  elEtiquetas.innerHTML = `<span class= "categoria t${_tags.tags[0]}" >duh… what num?</span>`;
  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#etiquetas").appendChild(elEtiquetas);
  //console.log("built etiquetas", elEtiquetas);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR OUTRAS ENTRADAS
function buildOutras(_outras) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let elOutras = document.createElement("article");
  let myID = "id-" + _outras.id;
  //console.log("outras", _outras);
  //console.log("total artigos rel", _outras.acf.entradas_relacionadas.length);
  elOutras.setAttribute("id", myID);

  // use string/template literals to build the HTML object
  elOutras.innerHTML = `<p id="outrasENTRIES"> ${_outras.acf.entradas_relacionadas}</p>`;
  document.querySelector(".box3dbx").appendChild(elOutras);
  

    for(let i = 0; i < _outras.acf.entradas_relacionadas.length; i++){
      let newel = document.createElement('span');
      let tid = "e-"+_outras.acf.entradas_relacionadas[i];
      newel.setAttribute('id', tid);
      // fetch de URL com o id (devolve um post unico)
      // let h1el = post.title.rendered
      // let urlel = post.url

      newel.innerHTML = ` `
      console.log(newel)

      document.querySelector("#outrasENTRIES").appendChild(newel);
    }
    
 
  
                      
 //default nao foram acrescentadas entradas relacionadas quer acrescentar outras
                        //para cada umas dessas entradas (for acf-entradas.length - for 
                                                            //para cada umas das entradas fazer um fetch
                        //                                     cada entrada relacionada. id
                        //                                     e devolve o titulo e o link)
                        // //devolve me o titulo e o link das entradas
                        // querySelector - entry-${_outras.id}
                        // substituir por cada umas das childs

  // place the new element on the page
  document.querySelector("#outras").appendChild(elOutras);
  // console.log("built outras", elOutras);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CONSTRUIR O LOCAL
function buildMedia(_media) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let elMedia = document.createElement("article");
  let myID = "id-" + _media.id;

  elMedia.setAttribute("id", myID);

  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  elMedia.innerHTML = `<figure >
                          <img src="">
                          <figcaption>Caption of image</figcaption>
                       </figure>`;
  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#post").appendChild(elMedia);
  //console.log("built lil imgs", elMedia);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA O FETCH DAS CATEGORIAS

function fetchCategory(_cat_num) {
  //console.log("fetching categories names");

  // TEXT STRING PARA INSERIR O ELEMENTO HTML
  let category_name = "";
  // URL BASE PARA FAZER FETCH AO NOMES DAS CATEGORIAS
  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/categories/";
  // ADICIONAR O NÚMERO DA CATEGORA > O URL FINAL SERÁ ALGO DO GÉNERO...
  // https://nit.fba.up.pt/dev/wp-json/wp/v2/categories/14
  url += _cat_num;

  fetch(url)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      // DEFENIR UMA NOVA TEXT STRING PARA CONSTRUIR A CLASS C/ NÚM.
      let myClass = ".c" + _cat_num;
      //console.log("my class", myClass);

      // QUERYSELECTORALL NA CLASSE AFETADA NO DOM
      let els = document.querySelectorAll(myClass);

      // EM CADA UM DOS ELEMENTOS, MUDA O TEXT/HTML PELO NOME QUE O WORDPRESS DÁ PARA A ETIQUETA
      for (let elcat of els) {
        elcat.innerHTML = dados.name;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA O CONSTRUIR DAS CATEGORIAS
function buildCategorias(_categorias) {
  // CRIAR UM NOVO ELEMENTO > ARTIGO
  let elcat = document.createElement("article");
  let myID = "id-" + _categorias.id;

  elcat.setAttribute("id", myID);

  // STRING/TEMPLTAE LITERALS PARA CONTRUIR O OBJETO HTML
  elcat.innerHTML = `<span class="categoria c${_categorias.categories[0]}">duh… what num?</span>`;

  // COLOCAR O NOVO ELEMENTO NA PÁGINA
  document.querySelector("#cats").appendChild(elcat);
  //console.log("built cats", elcat);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA FAZER FETCH DAS FOTOGRAFIAS E APPEND
async function fetchFeaturedMedia(_id, _media) {
  //console.log("fetching media");
  //console.log("id", _id);
  //console.log("media num", _media);

  let url = "https://nit.fba.up.pt/dev/wp-json/wp/v2/media/";
  url += _media;
  //console.log("featured media fetch url", url);

  // VARÍAVEL PARA "ARMAZENAR" O URL
  let mySrc = "";

  // ARMAZENAR A RESPOSTA NA ESPERA DA CHEGADA DO URL
  const resposta = await fetch(url);
  // VERIFICAR ERROS (URL NÃO FUNCIONAL)
  if (!resposta.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // TRANSFORMAR OS DADOS "AFTER WAITING FOR IT TO ARRIVE" INTO A NEW JSON OBJECT
  const dados = await resposta.json();

  // inspect the JSON object in the browser to find out the necessary data
  // eg.: https://nit.fba.up.pt/dev/wp-json/wp/v2/media/404
  // using dados.guid.rendered will return the full-size image src url
  // eg.: https://nit.fba.up.pt/dev/wp-content/uploads/2022/11/Museu-da-Imprensa.jpg
  // using dados.media_details.sizes.thumbnail.source_url will return predefined smaller sizes
  // eg.: https://nit.fba.up.pt/dev/wp-content/uploads/2022/11/Museu-da-Imprensa-300x121.jpg

  mySrc = dados.media_details.sizes.full.source_url;
  //console.log("featured media scr url", mySrc);

  let newel = document.createElement('img');
  newel.setAttribute('src', mySrc);
  //console.log(newel);

  document.querySelector("#post p").append(newel);
}