// CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", inicio);


function inicio() {
  console.log("está pronto!");

  // FUNÇÃO PARA FAZER O FETCH
  vaiBuscar();
  // MENU FILTROS >CATEGORIAS > CRIAR ESTE MENU
  criarCategoras();
  // BOTÃO > ADD&REMOVE CLASS / ENTER&LEAVE / AMINAÇÃO
  botaoHover();
}
/*------------------------------------------------------------------------------------------------------------------------------*/
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
        botaoClick(post);  
    }
    // DEPOIS DA CONSTRUÇÃO DO ARTIGO, PARA CADA ENTRADA DO WORDPRESS, CORRE UM SEGUNDO FETCH (FUNÇÃO)
    for (let post of dados) {
        fetchCategoria(post.categories[0]);
    }
    // DEPOIS, CORRER UM TERCEIRO FETCH
    for (let post of dados) {
      fetchImagens(post.id, post.featured_media);
    }
    })
    .catch(function (error) {
        console.log(error);
    })
}
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
                          <h1>${_post.title.rendered}</h1>
  
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
    document.querySelector("#NovoPost").appendChild(el);
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
        // EM CADA ELEMENTO, MUDAR O INNERHTML PARA O NOME DA CATEGORIA DESSE NÚMERO (WORDPRESS)
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
/*------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA CRIAR FILTROS > CATEGORIAS
function criarCategoras() {
  let ul = document.createElement('ul');
  ul.innerHTML = `<li><button id="btn1" class="filtros"><span class="bi bi-arrow-left-circle"></span>ARTEFACTOS</button></li>
                  <li><button id="btn2" class="filtros"><span class="bi bi-arrow-left-circle"></span>LOCAIS</button></li>
                  <li><button id="btn3" class="filtros"><span class="bi bi-arrow-left-circle"></span>PESSOAS</button></li>`
  document.querySelector("aside").appendChild(ul);

}
/*------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------*/
// FUNÇÃO PARA BOTÃO > ADD&REMOVE CLASS / ENTER&LEAVE / AMINAÇÃO
function botaoHover() {
// BOTÃO "VER A TIMELINE" > MOUSEENTER/MOUSELEAVE
$("button#timeline").mouseenter(function() {
  //console.log("i'm in!");
  $(this).addClass("btnHover");
  $("#boot-icon, #boot-icon2").addClass("seta");
  $("#boot-icon, #boot-icon2").css("background-color", "var(--black)");
})
$("button#timeline").mouseleave(function() {
  //console.log("i'm out!");
  $(this).removeClass("btnHover");
  $("#boot-icon, #boot-icon2").removeClass("seta");
  $("#boot-icon, #boot-icon2").css("background-color", "var(--antwhite)");
})
/*------------------------------------------------------------------------------------------------------------------------------*/
// BOTÃO FILTROS > MOUSEENTER/MOUSELEAVE
$("button.filtros").each(function() {
  $(this).mouseenter(function() {
    //console.log("i'm in!");
    $(this).addClass("btnHover");

    $(this).children(".bi-arrow-left-circle").each(function () {
      $(this).addClass("seta");
      $(this).css("background-color", "var(--black)");
    })

  })
  $(this).mouseleave(function() {
    //console.log("i'm out!");
    $(this).removeClass("btnHover");
      $(".bi-arrow-left-circle").removeClass("seta");
      $(".bi-arrow-left-circle").css("background-color", "var(--antwhite)");
  })
})
}
/*------------------------------------------------------------------------------------------------------------------------------*/
// BOTÃO CLICK > PARA FILTRAR CATEGORIAS
function botaoClick(_post) {
  $("button.filtros").each(function() {
      $(this).click(function() {
        console.log("i've been clicked!");
        if(this.id === 'btn1') {
          console.log("i'm button 1!");
          //console.log(_post.categories[0]);
          let filtro = document.querySelector("#NovoPost>article");
          let myCategory = "category-" + _post.categories[0];
          filtro.setAttribute("Category", myCategory);
          console.log(filtro.attributes);
        } else if(this.id === 'btn2') {
          console.log("i'm button 2!");
        } else if(this.id === 'btn3') {
          console.log("i'm button 3!");
        }
      })
  })
}