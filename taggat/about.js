addEventListener("load", inicio);


function inicio() {
  console.log("está pronto!");

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
    
              TAGLINEMostraCaixa.classList.toggle("TAGGATCaixaPreto");
              CaixaTAGGATTAGLINE.classList.toggle("TAGGATCaixaPreto");
            });
    };