addEventListener("load", inicio);


function inicio() {
  /*console.log("está pronto!");

    let TAGGATMostraCaixa = document.querySelector('#TAGGATMostraCaixa');
    let TAGLINEMostraCaixa = document.querySelector('#TAGLINEMostraCaixa');
    let TAGGATCaixa = document.querySelector('#TAGGATCaixa');
    let TAGLINECaixa = document.querySelector('#TAGLINECaixa');
    let CaixaTAGGATTAGLINE = document.querySelector("#CaixaTAGGATTAGLINE");

        TAGGATCaixa.addEventListener('click', function onclick(event){
        console.log('Ouch!');
        
        if (TAGGATMostraCaixa.style.display === "block") { 
            TAGGATMostraCaixa.style.display = "none"; 
          } else { 
            TAGGATMostraCaixa.style.display = "block"; 
          }

            TAGGATCaixa.classList.toggle("TAGGATCaixaPreto");
            CaixaTAGGATTAGLINE.classList.toggle("TAGGATCaixaPreto");
        });

        TAGLINECaixa.addEventListener('click', function onclick2(event){
            console.log('Ouch!2');
            
            if (TAGLINEMostraCaixa.style.display === "block") { 
                TAGLINEMostraCaixa.style.display = "none"; 
              } else { 
                TAGLINEMostraCaixa.style.display = "block"; 
              } 
    
              TAGLINECaixa.classList.toggle("TAGGATCaixaPreto");
              CaixaTAGGATTAGLINE.classList.toggle("TAGGATCaixaPreto");
            });*/

    /*let CaixaTAGGATTAGLINE = document.querySelector('#CaixaTAGGATTAGLINE');
    let TAGGATCaixa = document.querySelector('#TAGGATCaixa');
    let TAGLINECaixa = document.querySelector('#TAGLINECaixa');
    let TAGGATMostraCaixa = document.querySelector('#TAGGATMostraCaixa');
    let TAGLINEMostraCaixa = document.querySelector('#TAGLINEMostraCaixa');

    TAGGATCaixa.appendChild(TAGGATMostraCaixa);
    TAGLINECaixa.appendChild(TAGLINEMostraCaixa);

    function show(event) {
      event.target.style.display = 'block';
      console.log(event.target);
    }

    TAGGATCaixa.addEventListener('click', show, false);
    */



    //-----------------------------------------------------------------------------------------------------------------

    /* tentativa 2
    let TAGGATMostraCaixa = document.querySelector('#TAGGATMostraCaixa');
    let TAGGATCaixa = document.querySelector('#TAGGATCaixa');
    let TAGGATisOpen = false
    
    let TAGLINEMostraCaixa = document.querySelector('#TAGLINEMostraCaixa');
    let TAGLINECaixa = document.querySelector('#TAGLINECaixa');
    let TAGLINEisOpen = false
    
    let divConteudo = document.querySelector("#divConteudo");

    TAGGATCaixa.appendChild(TAGGATMostraCaixa);
    TAGLINECaixa.appendChild(TAGLINEMostraCaixa);

    function handler(event){
      var target = $(event.target);
      if (target.is(TAGGATCaixa)){
        target.children().toggle();
      }
    }

    function handler2(event){
      let target = $(event.target);
      if (target.is(TAGGATCaixa)){
        if(TAGGATisOpen == true){
          closeTagat()
        } else {
          openTagat()
          closeTagLine()
        }
      } else if (target.is(TAGLINECaixa)){
        if(TAGLINEisOpen){
          closeTagLine()
        } else {
          openTagLine()
          closeTagat()
        }
      }

    }

    function openTagat(){
      console.log('openTagat')
        TAGGATCaixa.classList = ['TitulosPagSobreSelecionado']
        divConteudo.classList = ['divConteudoAberto']
        TAGGATisOpen = true;
    }

    function closeTagat(){
      TAGGATCaixa.classList = ['TitulosPagSobre']
      divConteudo.classList = ['divConteudoFechado']
      TAGGATisOpen = false;
  }

    function openTagLine(){
        TAGGATCaixa.classList = ['TitulosPagSobreSelecionado']
        divConteudo.classList = ['divConteudoAberto']
        TAGLINEisOpen = true;
    }

    function closeTagLine(){
      TAGGATCaixa.classList = ['TitulosPagSobre']
      
      divConteudo.classList = ['divConteudoFechado']
      TAGLINEisOpen = false;
  }
    
    $(TAGGATCaixa).click(handler2).find(TAGGATCaixa).hide();
  */




  //--------------------------------------------------------------------------------------------------------------
  // Tentativa 3

  let TítuloTAGGAT = document.querySelector("#TítuloTAGGAT");
  let TítuloTAGLINE = document.querySelector("#TítuloTAGLINE");

  let TextoTAGGAT = document.querySelector("#TextoTAGGAT");
  let TextoTAGLINE = document.querySelector("#TextoTAGLINE");

  let ConteúdoTAGGATTAGLINE = document.querySelector("#ConteúdoTAGGATTAGLINE");

  TítuloTAGGAT.addEventListener('click', function showContentTAGGAT(){

    console.log("hello");
    if (ConteúdoTAGGATTAGLINE.style.display === "none") {
      ConteúdoTAGGATTAGLINE.style.display = "block";
      TextoTAGGAT.style.display = "block";
      TítuloTAGGAT.classList.add('TAGGATCaixaPreto');
    } else {
      ConteúdoTAGGATTAGLINE.style.display = "none";
      TextoTAGGAT.style.display = "none";
      TítuloTAGGAT.classList.remove('TAGGATCaixaPreto');
  }

});

  TítuloTAGLINE.addEventListener('click', function showContentTAGLINE(){

    console.log("helloagain");
    if (ConteúdoTAGGATTAGLINE.style.display === "none") {
      ConteúdoTAGGATTAGLINE.style.display = "block";
      TextoTAGLINE.style.display = "block";
      TítuloTAGLINE.classList.add('TAGGATCaixaPreto');
    } else {
      ConteúdoTAGGATTAGLINE.style.display = "none";
      TextoTAGLINE.style.display = "none";
      TítuloTAGLINE.classList.remove('TAGGATCaixaPreto');
  }});
    };
