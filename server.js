
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.get('/:date', function(req, res){
  
  var dataOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  var date = req.params.date;
  

  if (isNaN(Number(date))){
    var natural = new Date(date).toLocaleDateString('en-US', dataOptions);
    var timestamp = Date.parse(natural)/1000;
  } 
  else{
    var timestamp = Number(date);
    
    var natural = new Date(timestamp*1000).toLocaleDateString('en-US', dataOptions);
  }
  
  res.json({unix: timestamp, natural: natural})
})

app.listen(process.env.PORT);

