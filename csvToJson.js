const fs = require('fs')
let data = fs.readFileSync('./config.csv', {encoding: 'utf-8'})
fs.writeFileSync('./src/mapping.json', csvJSON(data), {encoding: 'utf-8'})


function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");
  var tmpHeaders = []
  headers.forEach(e => {
    tmpHeaders.push(e.replace('\r', ''))
  });
  headers = tmpHeaders

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
        if(headers[j] === 'type' && (currentline[j]=== 'Encoder' || currentline[j] === 'PotMeter' || currentline[j] === 'Fader')) {
          obj.controller = obj.note
          delete obj.note
          obj[headers[j]] = currentline[j];
        } else {
          if (currentline[j]) {
            if (currentline[j].replace('\r', ''))
            if (parseInt(currentline[j]) >= 0) {
              obj[headers[j]] = parseInt(currentline[j])
            } else {
              obj[headers[j]] = currentline[j]
            }
          }
        }
      }

      result.push(obj);

  }

  // return result; //JavaScript object
  return JSON.stringify(result, null, 2); //JSON
}