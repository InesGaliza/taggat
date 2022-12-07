// CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", goRun);


function goRun() {
  console.log("está pronto!");

  // FUNÇÃO PARA FAZER O FETCH
  vaiBuscar();

  // MENU FILTROS >CATEGORIAS > CRIAR ESTE MENU
  criarCategoras();

// BOTÃO > ADD&REMOVE CLASS / ENTER&LEAVE / AMINAÇÃO
botaoHover();

// ANIMAÇÃO DO MENU
menu();

}

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
  let open = true
  if($(this).children("figure").css("display")=="block"){ 
    open = false;
  }
  $("article").children("figure").css("display", "none");
  $("article").css("background-color", "rgb(240, 240, 240)");
  $("article").children("a").children("h1").css("background-color", "rgb(240, 240, 240)");
  $("article").children(".meta").children("span").css("background-color", "rgb(240, 240, 240)");
  $("article").children(".meta").css("background-color", "rgb(240, 240, 240)");
  $("article").children("a").children("h1").css("color","#000");
  $("article").children(".meta").children("span").css("color","#000");
  $("article").children(".meta").children("span:first-child").css("background-color", "var(--antwhite)");
  $("article").children(".meta").children("span:first-child").css("color", "#707070");


  if(open){

    $(this).children("a").children("h1").css("background-color", "#000");
    $(this).children("a").children("h1").css("color", "#fff");
    $(this).children(".meta").children("span").css("background-color", "#000");
    $(this).children(".meta").children("span:first-child").css("background-color", "var(--antwhite)");  
    $(this).children(".meta").children("span").css("color", "#fff");
    $(this).children(".meta").children("span:first-child").css("color", "#707070");
    $(this).children(".meta").css("background-color", "#000");
    $(this).css("background-color","#000");
    $(this).css("color","#000"); 
    $(this).children("figure").toggle();
    $(this).children("figure").css("position","absolute");


  }

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
  let myClass = "class-" + _post.categories[0];

  el.setAttribute("id", myID);
  el.setAttribute("class", myClass);

  // UTLIZAR STRING / TEMPLATE LITERALS PARA CONSTRUIR O OBJETO HTML
  el.innerHTML = `<figure >
                        <img src="">
                  </figure>

                        <!-- PARA ENCONTRAR OS DADOS NECESSÁRIOS, É NECESSÁRIO INSPECIONAR O OBJETO JSON NO BROWSER -->
                        <a href="article.htm?post=${_post.id}"><h1>${_post.title.rendered}</h1></a>

                        <div class="meta">
                             <span class="categoria c${_post.categories[0]}">duh… what num?</span>
                            <span class="data">${_post.acf.data}</span>
                            <!-- <span class="local">${_post.acf.local}</span> -->

                            <!-- O POST ORIGINAL DO JSON SÓ TEM O ID (número) DA CATEGORIA -->
                            <!-- PODEMOS POR O NÚMERO DE CATEGORIA COMO UMA CLASSE -->
                            <!-- DEPOIS, FAZENDO UM SEGUNDO FETCH LOOP, DEFINIMOS O INNERHTML DESTES ELEMENTOS -->
                           
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

  mySrc = dados.media_details.sizes.full.source_url;
  //console.log("featured media scr url", mySrc);

  let myID = "#id-" + _id;
  let myEl = document.querySelector(myID);
  myEl.children.item(0).children.item(0).setAttribute("src", mySrc);
}


// FUNÇÃO PARA CRIAR FILTROS > CATEGORIAS
function criarCategoras() {
  let ul = document.createElement('ul');
  // CRIAR OS BOTÕES PARA OS FILTROS
  // CRIAR UM EXTRA BOTÃO PARA TODAS AS CATEGORIAS
  // SEMPRE QUE FOR ADICIONADA UMA CATEGORIA... CRIAR UM BOTÃO
  // <button id="btn0" class="filtros target-(NÚMERO DA CATEGORIA)">
  ul.innerHTML = `<li><button id="btn0" class="filtros target-0"><span class="bi bi-arrow-left-circle"></span>VER TODOS</button></li>
                <li><button id="btn1" class="filtros target-52"><span class="bi bi-arrow-left-circle"></span>LOCAIS</button></li>
                <li><button id="btn2" class="filtros target-37"><span class="bi bi-arrow-left-circle"></span>ARTEFACTOS</button></li>
                <li><button id="btn3" class="filtros target-14"><span class="bi bi-arrow-left-circle"></span>PESSOAS</button></li>`

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
      if (targetClass === "0") {
          // PÔR TODOS VISÍVEIS
          $("article").css("display", "grid");
      }
      if (targetClass === "52") {
          // console.log("sou os Artefactos!");
          // PÔR TODOS INVISÍVEIS
          $("article").css("display", "none");
          // PÔR A CATEGORIA VISÍVEIS
          $("article.class-" + targetClass).css("display", "grid");
      } else if (targetClass === "37") {
          // console.log("sou os Locais!");
          $("article").css("display", "none");
          $("article.class-" + targetClass).css("display", "grid");
      } else if (targetClass === "14") {
          // console.log("sou as Pessoas!");
          $("article").css("display", "none");
          $("article.class-" + targetClass).css("display", "grid");
      }
  });
  document.querySelector("aside").appendChild(ul);
}





// FUNÇÃO PARA BOTÃO > ADD&REMOVE CLASS / ENTER&LEAVE / AMINAÇÃO
function botaoHover() {
  /*------------------------------------------------------------------------------------------------------------------------------*/
  // BOTÃO FILTROS > MOUSEENTER/MOUSELEAVE
  $("button.filtros").each(function() {
      $(this).click(function() {
          $("button.filtros").removeClass("btnHover");
          $(".bi-arrow-left-circle").removeClass("seta");

          $(this).addClass("btnHover");
          $(this).children(".bi-arrow-left-circle").each(function() {
              $(this).addClass("seta");
          })
      })
  })
}