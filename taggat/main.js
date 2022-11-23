// CORRE A FUNÇÃO (O QUE O JS ESTÁ A FAZER), DEPOIS DO CONTEÚDO SER CARREGADO > EVENT LISTENER "LOAD"
addEventListener("load", inicio);


function inicio() {
  console.log("está pronto!");
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
    })

    // 

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
                          <figcaption>Caption of image</figcaption>
                          </figure>
  
                          <!-- PARA ENCONTRAR OS DADOS NECESSÁRIOS, É NECESSÁRIO INSPECIONAR O OBJETO JSON NO BROWSER -->
                          <h1>${_post.title.rendered}</h1>
  
                          <div class="meta">
                              <span class="data">${_post.acf.data}</span>
                              <span class="local">${_post.acf.local}</span>
  
                              <!-- O POST ORIGINAL DO JSON SÓ TEM O ID (número) DA CATEGORIA -->
                              <!-- PODEMOS POR O NÚMERO DE CATEGORIA COMO UMA CLASSE -->
                              <!-- DEPOIS, FAZENDO UM SEGUNDO FETCH LOOP, DEFINIMOS O INNERHTML DESTES ELEMENTOS -->
                              <span class="categoria c${_post.categories[0]}">duh… what num?</span>
                          </div>
  
                          <!-- <p>${_post.content.rendered}</p> -->`;
  
    // COLOCAR O OBJETO CRIADO NO ARTIGO CRIADO
    document.querySelector("#posts").appendChild(el);
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