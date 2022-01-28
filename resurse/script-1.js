

window.onload = editare_afisare;


function editare_afisare(){
    
    document.getElementById("retrimite").style.visibility = "hidden";
    var trimite = document.getElementById("trimite");
    var formular = document.getElementById("formular");
    var buget = document.getElementById("input1");

    formular.style.fontSize = 30+'px';
    formular.style.marginTop = 20+'px';
    formular.style.display = 'inline-block';
    buget.style.height = 30+'px';
    buget.style.fontSize = 25+'px';
    trimite.style.fontSize = 30+'px';
    trimite.style.display = 'inline-block';
    trimite.style.float = 'right';
    trimite.style.marginRight = 10+'px';
    trimite.style.marginTop = 20+'px';
    trimite.addEventListener("click", calculeaza);

}

function calculeaza(event){
    var buget = document.getElementById("input1").value;
    var preturi = new Array(18, 19, 59, 451, 100, 22, 25, 150, 325, 150, 3045, 150, 680, 350);
    var rezultat = document.createElement('p');
    
    var nrElementeAccesibile = 0;
    for(i=0;i<preturi.length;i++)
        if(parseInt(buget) > preturi[i])
            nrElementeAccesibile++;
    rezultat.innerHTML = 'Va puteti achizitiona ' + nrElementeAccesibile + ' dintre serviciile oferite de noi!';
    rezultat.classList.add("result");
    var culori = new Array("white", "orange", "red", "yellow", "green");
    var culRand = Math.floor(Math.random() * 4); 
    rezultat.style.backgroundColor = culori[culRand];
    var replacedChild = document.querySelector("#form");
    var parent = replacedChild.parentNode;

    var trimite = document.getElementById("trimite");
    var buton = document.createElement('button');
    buton.innerHTML = "Retrimitere buget";
    var stil = window.getComputedStyle(trimite);
    buton.style.marginTop = stil.getPropertyValue("margin-top");
    buton.style.fontSize = stil.getPropertyValue("font-size");
    
    parent.replaceChild(rezultat, replacedChild);
    
    setTimeout(function(){
        parent.insertBefore(buton, rezultat);
        buton.onclick = recursion;
    }, 3000);

    function recursion(){
        parent.removeChild(rezultat);
        parent.replaceChild(replacedChild, buton);
        event.stopPropagation();
        editare_afisare();
    }
    
 
}