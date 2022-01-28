window.onload = afisare_formular;

function afisare_formular(){
    var intrebare = document.querySelector("#form");
    var question = document.querySelector("#intrebare");
    var parent = intrebare.parentNode;
    var buton = document.createElement('button');
    buton.innerHTML = "Inapoi";
    buton.style.fontSize = 30 + 'px';
    intrebare.onchange = function(){
        var cardiologie = document.querySelector("#cardiologie");
        var chirurgie = document.querySelector("#chirurgie");
        var endocrinologie = document.querySelector("#endocrinologie");
        var hematologie = document.querySelector("#hematologie");
        var neurologie = document.querySelector("#neurologie");
        var oftalmologie = document.querySelector("#oftalmologie");
        var psihologie = document.querySelector("#psihologie");
        var radiologie = document.querySelector("#radiologie");
        var footer = document.querySelector("#contact-footer");
        cardiologie.style.visibility = "hidden";
        chirurgie.style.visibility = "hidden";
        endocrinologie.style.visibility = "hidden";
        hematologie.style.visibility = "hidden";
        neurologie.style.visibility = "hidden";
        oftalmologie.style.visibility = "hidden";
        psihologie.style.visibility = "hidden";
        radiologie.style.visibility = "hidden";
        footer.style.visibility = "hidden";
        parent.removeChild(question);
        var butoane = document.querySelectorAll("input");
        for(i=0;i<butoane.length;i++){
            butoane[i].disabled = true;
            if(butoane[i].checked==true && butoane[i].value!='toate'){
                if(butoane[i].value == cardiologie.id){
                    parent.replaceChild(cardiologie, intrebare);
                    cardiologie.style.visibility = "visible";
                    parent.insertBefore(buton, cardiologie);
                }
                if(butoane[i].value == chirurgie.id){
                    parent.replaceChild(chirurgie, intrebare);
                    chirurgie.style.visibility = "visible";
                    parent.insertBefore(buton, chirurgie);
                }
                if(butoane[i].value == endocrinologie.id){
                    parent.replaceChild(endocrinologie, intrebare);
                    endocrinologie.style.visibility = "visible";
                    parent.insertBefore(buton, endocrinologie);
                }
                if(butoane[i].value == hematologie.id){
                    parent.replaceChild(hematologie, intrebare);
                    hematologie.style.visibility = "visible";
                    parent.insertBefore(buton, hematologie);
                }
                if(butoane[i].value == neurologie.id){
                    parent.replaceChild(neurologie, intrebare);
                    neurologie.style.visibility = "visible";
                    parent.insertBefore(buton, neurologie);
                }
                if(butoane[i].value == oftalmologie.id){
                    parent.replaceChild(oftalmologie, intrebare);
                    oftalmologie.style.visibility = "visible";
                    parent.insertBefore(buton, oftalmologie);
                }
                if(butoane[i].value == psihologie.id){
                    parent.replaceChild(psihologie, intrebare);
                    psihologie.style.visibility = "visible";
                    parent.insertBefore(buton, psihologie);
                }
                if(butoane[i].value == radiologie.id){
                    parent.replaceChild(radiologie, intrebare);
                    radiologie.style.visibility = "visible";
                    parent.insertBefore(buton, radiologie);
                }
            }
            else
                if(butoane[i].checked==true && butoane[i].value=='toate'){
                    parent.insertBefore(buton, intrebare);
                    parent.removeChild(intrebare);
                    cardiologie.style.visibility = "visible";
                    chirurgie.style.visibility = "visible";
                    endocrinologie.style.visibility = "visible";
                    hematologie.style.visibility = "visible";
                    neurologie.style.visibility = "visible";
                    oftalmologie.style.visibility = "visible";
                    psihologie.style.visibility = "visible";
                    radiologie.style.visibility = "visible";
                    footer.style.visibility = "visible";
                }
        }

        buton.onclick = function(){
            parent.replaceChild(intrebare, buton);
            parent.insertBefore( question ,intrebare);
            for(i=0;i<butoane.length;i++){
                butoane[i].checked = false;
                butoane[i].disabled = false;
            }
            afisare_formular();
        }
        
    }
}