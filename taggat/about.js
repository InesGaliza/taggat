addEventListener("load", inicio);


function inicio() {

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


  let sobreSubtituloTaggat = document.querySelector("#sobreSubtituloTaggat");
  let sobreSubtituloTagline = document.querySelector("#sobreSubtituloTagline");

  let infoTaggat = document.querySelector("#sobreInfoTaggat");
  let infoTagline = document.querySelector("#sobreInfoTagline");

  let contentorInfo = document.querySelector("#sobreContentorInfo");

  sobreSubtituloTagline.addEventListener('click', function showContentTAGLINE(){

    if (contentorInfo.style.display === "block" && sobreSubtituloTagline.classList.contains('sobreVersaoPreto')) {
      contentorInfo.style.display = "none";
      infoTagline.style.display = "none";
      sobreSubtituloTagline.classList.remove('sobreVersaoPreto');
    } else if (contentorInfo.style.display === "block" && !sobreSubtituloTagline.classList.contains('sobreVersaoPreto')) {
      infoTaggat.style.display = "none";
      sobreSubtituloTaggat.classList.remove('sobreVersaoPreto');
      infoTagline.style.display = "block";
      sobreSubtituloTagline.classList.add('sobreVersaoPreto');
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

  });
};
