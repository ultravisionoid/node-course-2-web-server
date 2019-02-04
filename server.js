const express = require('express');
const hbs = require('hbs');
const fs= require('fs');
var app = express();
console.log("staring app");
hbs.registerPartials(__dirname+'/views/partials');


app.set('view engine','hbs');
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = now+""+req.method+''+req.url
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('unable to appnd to server.log')
		}
	})
	next();
});
app.use((req,res,next)=>{
	res.render('maintainence.hbs');
})

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('currYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})

app.get('/',(req,resp)=>{
	resp.render('home.hbs',{
		pagetitle:"Home Page",
		welcomemessage:"Welcome to my website",
		//currentyear:new Date().getFullYear()
	})
});
app.get('/about',(req,resp)=>{
	resp.render("about.hbs",	{
		pagetitle:'About page',
	//	currentyear:new Date().getFullYear()
	});
});
//console.log(getYear())
app.listen(3000,()=>{
	console.log('server is up at 3000');
});
app.get('/bad',(req,resp)=>{
	resp.send({
		errormessage: 'unable to handle request'
	});
});




