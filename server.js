const express=require("express");
const app=express();
const nodemailer=require("nodemailer");
const fs=require("fs");
var formidable = require('formidable');
const session = require('express-session');

app.use(express.static("resurse"));

app.set('view engine', 'ejs');

app.use('/formular', express.urlencoded({extended:true}));

app.post('/formular',function(req,res){
    console.log(req.body);
    console.log(typeof req.body);
    var t="";
    
    const ob=[{ziua: "luni", ora_inceput: "08:00", ora_sfarsit: "18:00"}, 
        {ziua: "marti", ora_inceput: "10:00", ora_sfarsit: "18:00"},
        {ziua: "miercuri", ora_inceput: "08:00", ora_sfarsit: "18:00"},
        {ziua: "joi", ora_inceput: "10:00", ora_sfarsit: "16:00"},
        {ziua: "vineri", ora_inceput: "09:00", ora_sfarsit: "18:00"},
        {ziua: "sambata", ora_inceput: "10:00", ora_sfarsit: "13:00"}
    ]
    for (zi of ob){
        if(req.body.ziua==zi.ziua && req.body.ora < zi.ora_sfarsit && req.body.ora > zi.ora_inceput)
            t = req.body;
    }
    if(t=="")
        res.send("Alegeti alta ora!");
    else{
        var transporter = nodemailer.createTransport({ //face autentificarea
            service: 'gmail',
            auth: {
            user: 'pirlogealuciana@gmail.com',
            pass: 'sydneyparismadridnewyork'
            }
        });
        var mailOptions = { //optiunile mesajului
            from: 'pirlogealuciana@gmail.com',
            to: t.email ,
            subject: 'Confirmare programare',
            text: 'Buna ziua! Confirmam programarea facuta cu urmatoarele date: \n' + 'Nume: '+ t.nume + '\nPrenume: ' + t.prenume +'\nSpecialitatea: ' +t.specialitatea + '\nZiua: '+t.ziua +'\nOra: '+ t.ora
        };

        transporter.sendMail(mailOptions, function(error, info){ //trimite mail
            if (error) {
            console.log(error);
            } else {
            console.log('Mail trimis: ' + info.response);
            }
           });
        
         res.send("Programarea a fost facuta cu succes! Am trimis un mail de confirmare. O zi buna!");  
    }
});

app.use(session({
    secret: 'abcdefg', // folosit pentru criptarea session ID-ului
    resave: true, //sa nu stearga sesiunile idle
    saveUninitialized: false //nu salveaza obiectul sesiune daca nu am setat un camp
}));




app.get('/login', function(req,res){

    res.render('pagini/login',{'mesaj': 'Login'});
   });
   
   app.use('/login_post', express.json()); 
   app.post('/login_post', function(req, res) {
       var user;
       var form = new formidable.IncomingForm();
       form.parse(req, function(err, fields, files) {
            var useri_json = fs.readFileSync('resurse/useri.json','utf8');
            var useri = JSON.parse(useri_json);
            var gasit = -1;
            for(i=0;i<useri.length;i++){
                  if(useri[i].user==fields.username && useri[i].parola==fields.parola)
                      gasit = i;
            }
            if(gasit!=-1)
                user = useri[gasit].user;
      
           if(user){
               req.session.username=user;//setez userul ca proprietate a sesiunii
                        res.redirect('/logat');}
           else {
           req.session.username=false;
   
              res.redirect('/incorect');}
           });
       });
   
   app.get('/logat', function(req, res) {
           res.render('pagini/logout',{'nume': req.session.username});
       });
   
   app.get('/incorect', function(req, res) {
           res.render('pagini/login',{'mesaj': 'Username si/sau parola gresite'});
       });
   
   app.get('/logout', function(req, res) {
   req.session.destroy();  //distrugem sesiunea cand se intra pe pagina de logout
   res.render('pagini/login',{'mesaj': 'Conectare in cont'});
   
   });


app.use(function(req,res){
    res.status(404).send("<html><body><center>Pagina nu a fost gasita! Va rugam incercati alta cale!</center></body><html>");});

app.listen(8000,function(){console.log("Serverul a pornit");});