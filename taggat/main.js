// CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", inicio);

function inicio() {
  console.log("está pronto!");

  // FUNÇÃO PARA FAZER O FETCH
  vaiBuscar();
  // MENU FILTROS > CATEGORIAS > CRIAR ESTE MENU
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
    console.log("o array:", dados);
    //REORGANIZAR O ARRAY PELO ANO (ACF.DATA)
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-date-property
    let rearranjedArr = dados.sort(
      (objA, objB) => Number(objA.acf.data) - Number(objB.acf.data),
    );
    console.log(rearranjedArr)

    // PARA CADA ENTRADA DO WORDPRESS (CADA OBJETO DO ARRAY) CONTROI UM ARTIGO (FUNÇÃO)
    for (let post of rearranjedArr) {
        construirArtigo(post);
    }
    // DEPOIS DA CONSTRUÇÃO DO ARTIGO, PARA CADA ENTRADA DO WORDPRESS, CORRE UM SEGUNDO FETCH (FUNÇÃO)
    for (let post of rearranjedArr) {
        fetchCategoria(post.categories[0]);
    }
    // DEPOIS, CORRER UM TERCEIRO FETCH
    for (let post of rearranjedArr) {
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
    let myClass = "class-" + _post.categories[0];
    el.setAttribute("id", myID);
    el.setAttribute("class", myClass);
    // console.log(el);

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
  //console.log("estou fetchar o media!");
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
  // CRIAR OS BOTÕES PARA OS FILTROS
  // CRIAR UM EXTRA BOTÃO PARA TODAS AS CATEGORIAS
  // SEMPRE QUE FOR ADICIONADA UMA CATEGORIA... CRIAR UM BOTÃO
  // <button id="btn0" class="filtros target-(NÚMERO DA CATEGORIA)">
  ul.innerHTML = `<li><button id="btn0" class="filtros target-0"><span class="bi bi-arrow-left-circle"></span>VER TODOS</button></li>
                  <li><button id="btn1" class="filtros target-52"><span class="bi bi-arrow-left-circle"></span>ARTEFACTOS</button></li>
                  <li><button id="btn2" class="filtros target-37"><span class="bi bi-arrow-left-circle"></span>LOCAIS</button></li>
                  <li><button id="btn3" class="filtros target-14"><span class="bi bi-arrow-left-circle"></span>PESSOAS</button></li>`

/*------------------------------------------------------------------------------------------------------------------------------*/

//QUANDO CLICAR NOS BOTÕES DAS CATEGORIAS...
  ul.addEventListener('click', function(e) {
    //console.log("hey, it's me, the buttons!");
    let nomeClass, target;
    let botoes = document.querySelectorAll('button.filtros');
    // console.log(botoes);

    // GET BOTÕES
    for (let botao of botoes) {
      e.nomeClass = botao.className;
      // console.log(botao.id);
      // console.log(nomeClass);

    // DECLARAR O TARGET (BUTÃO) COM SLICE
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
      e.target = e.nomeClass.slice(7);
      // console.log(e.target);
    }

    // GET UM
    console.log(e.target);
    // GET CLASSES
    targetClass = e.target.className.slice(15, -9);
    console.log(targetClass);

    // SE O TARGETCLASS FOR IGUAL A... 
    // FAZ SÓ DISPLAY DESSES ARTIGOS...
    // SEMPRE QUE FOR ADICIONADA UMA CATEGORIA... 
    // ADICIONAR UM NOVO ELSE IF COM O NÚMERO DA CATEGORIA
    if(targetClass === "0") {
      // PÔR TODOS VISÍVEIS
      $("article").css("display","block");
    }
    if(targetClass === "52") {
      // console.log("sou os Artefactos!");
      // PÔR TODOS INVISÍVEIS
      $("article").css("display","none");
      // PÔR A CATEGORIA VISÍVEIS
      $("article.class-"+targetClass).css("display","block");
    } else if(targetClass==="37") {
      // console.log("sou os Locais!");
      $("article").css("display","none");
      $("article.class-"+targetClass).css("display","block");
    } else if(targetClass==="14") {
      // console.log("sou as Pessoas!");
      $("article").css("display","none");
      $("article.class-"+targetClass).css("display","block");
    }
  });
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
// COM AJUDA DA LÓGICA > https://jsfiddle.net/KyleMit/8vFJA/
$("button.filtros").each(function() {
$(this).click(function() {
  $("button.filtros").removeClass("btnHover");
  $(".bi-arrow-left-circle").removeClass("seta");

  $(this).addClass("btnHover");
  $(this).children(".bi-arrow-left-circle").each(function () {
    $(this).addClass("seta");
    })
})
})
}

/*------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------*/