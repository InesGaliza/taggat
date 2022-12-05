addEventListener("load", inicio);


function inicio() {

  // MENU
  menu();

  // CATEGORIAS
  abrirCategorias();
};


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



// FUNÇÃO PARA ABRIR AS CATEGORIAS
function abrirCategorias(){
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

// AO CLICKAR NO TÍTULO TAGGAT
sobreSubtituloTaggat.addEventListener('click', function showContentTAGGAT(){

  // SE AO CLICKAR O CONTENTOR EXISTIR EM BLOCK E O TÍTULO TAGGAT ESTIVER COM FUNDO PRETO
  // DESAPARECE O CONTENTOR E O TÍTULO FICA COM FUNDO BRANCO
  if (contentorInfo.style.display === "block" && sobreSubtituloTaggat.classList.contains('sobreVersaoPreto')) {
    contentorInfo.style.display = "none";
    infoTaggat.style.display = "none";
    sobreSubtituloTaggat.classList.remove('sobreVersaoPreto');

  // SE AO CLICKAR O CONTENTOR EXISTIR EM BLOCK E O TÍTULO TAGGAT ESTIVER COM FUNDO PRETO
  // O CONTENTOR DO TEXTO TAGLINE DESAPARECE E O TÍTULO TAGLINE FICA COM FUNDO BRANCO
  } else if (contentorInfo.style.display === "block" && !sobreSubtituloTaggat.classList.contains('sobreVersaoPreto')) {
    infoTagline.style.display = "none";
    sobreSubtituloTagline.classList.remove('sobreVersaoPreto');
    infoTaggat.style.display = "block";
    sobreSubtituloTaggat.classList.add('sobreVersaoPreto');

  // TENDO EM CONTA AS CONDIÇÕES ANTERIORES, O CONTENTOR E O TEXTO DO TAGGAT APARECEM E O TÍTULO FICA A PRETO
  } else {
    contentorInfo.style.display = "block";
    infoTaggat.style.display = "block";
    sobreSubtituloTaggat.classList.add('sobreVersaoPreto');
  }

})};