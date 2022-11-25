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

    let TAGGATMostraCaixa = document.querySelector('#TAGGATMostraCaixa');
    let TAGLINEMostraCaixa = document.querySelector('#TAGLINEMostraCaixa');
    let TAGGATCaixa = document.querySelector('#TAGGATCaixa');
    let TAGLINECaixa = document.querySelector('#TAGLINECaixa');
    let CaixaTAGGATTAGLINE = document.querySelector("#CaixaTAGGATTAGLINE");

    TAGGATCaixa.appendChild(TAGGATMostraCaixa);
    TAGLINECaixa.appendChild(TAGLINEMostraCaixa);

    function handler(event) {
      var target = $( event.target );
      if (target.is(TAGGATCaixa)) {
        target.children().toggle();
      }
    }
    
    $(TAGGATCaixa).click(handler).find(TAGGATCaixa).hide();

    };