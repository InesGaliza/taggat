addEventListener("load", inicio);


function inicio() {
  menu();
  openCategories();
};


// MENU
function menu(){
  
  // CRIAR VARIÁVEL PARA AS LINHAS DO MENU (BOTÃO)
  let hamMenu = document.querySelector(".linhasMenu");
  // CRIAR VARIÁVEL PARA A CAIXA QUE CONTÉM A LISTA NAVEGÁVEL QUE APARECE CARREGANDO NO MENU
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
  });

  // AO CARREGAR NA CAIXA QUE CONTÉM A LISTA NAVEGÁVEL, O MENU FECHA
  menuAberto.addEventListener('click', function fechaMenu(){
    if (menuAberto.style.left === "0%"){
      menuAberto.style.left = "100%";
    }
  });
};

function openCategories(){
// VARIÁVEIS DOS TíTULOS DAS CATEGORIAS - TAGGAT E TAGLINE
let sobreSubtituloTagline = document.querySelector("#sobreSubtituloTagline");
let sobreSubtituloTaggat = document.querySelector("#sobreSubtituloTaggat");

// VARIÁVEIS DO TEXTO CORRESPONDENTE AOS TíTULOS - TAGGAT E TAGLINE
let infoTagline = document.querySelector("#sobreInfoTagline");
let infoTaggat = document.querySelector("#sobreInfoTaggat");

// VARIÁVEL DO CONTENTOR QUE CONTÉM OS TEXTOS ANTERIORES
let contentorInfo = document.querySelector("#sobreContentorInfo");

// AO CLICKAR NO TÍTULO TAGLINE
sobreSubtituloTagline.addEventListener('click', function showContentTAGLINE(){

  // SE AO CLICKAR O CONTENTOR EXISTIR EM BLOCK E O TÍTULO TAGLINE ESTIVER COM FUNDO PRETO
  // DESAPARECE O CONTENTOR E O TÍTULO FICA COM FUNDO BRANCO
  if (contentorInfo.style.display === "block" && sobreSubtituloTagline.classList.contains('sobreVersaoPreto')) {
    contentorInfo.style.display = "none";
    infoTagline.style.display = "none";
    sobreSubtituloTagline.classList.remove('sobreVersaoPreto');

  // SE AO CLICKAR O CONTENTOR EXISTIR EM BLOCK E O TÍTULO TAGLINE ESTIVER COM FUNDO PRETO
  // O CONTENTOR DO TEXTO TAGGAT DESAPARECE E O TÍTULO TAGGAT FICA COM FUNDO BRANCO
  } else if (contentorInfo.style.display === "block" && !sobreSubtituloTagline.classList.contains('sobreVersaoPreto')) {
    infoTaggat.style.display = "none";
    sobreSubtituloTaggat.classList.remove('sobreVersaoPreto');
    infoTagline.style.display = "block";
    sobreSubtituloTagline.classList.add('sobreVersaoPreto');

  // TENDO EM CONTA AS CONDIÇÕES ANTERIORES, O CONTENTOR E O TEXTO DO TAGLINE APARECEM E O TÍTULO FICA A PRETO
  } else {
    contentorInfo.style.display = "block";
    infoTagline.style.display = "block";
    sobreSubtituloTagline.classList.add('sobreVersaoPreto');
  }
});

sobreSubtituloTaggat.addEventListener('click', function showContentTAGGAT(){

  if (contentorInfo.style.display === "block" && sobreSubtituloTaggat.classList.contains('sobreVersaoPreto')) {
    contentorInfo.style.display = "none";
    infoTaggat.style.display = "none";
    sobreSubtituloTaggat.classList.remove('sobreVersaoPreto');
  } else if (contentorInfo.style.display === "block" && !sobreSubtituloTaggat.classList.contains('sobreVersaoPreto')) {
    infoTagline.style.display = "none";
    sobreSubtituloTagline.classList.remove('sobreVersaoPreto');
    infoTaggat.style.display = "block";
    sobreSubtituloTaggat.classList.add('sobreVersaoPreto');
  } else {
    contentorInfo.style.display = "block";
    infoTaggat.style.display = "block";
    sobreSubtituloTaggat.classList.add('sobreVersaoPreto');
  }

})};