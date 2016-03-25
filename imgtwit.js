console.log('The image bot is starting');

var fs = require('fs');
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
//this is need it in order to execute the cmd
var exec = require('child_process').exec;

tweetIt();

function tweetIt(){
  //function starts by executing the processing-java sketch
  var cmd ='./processing/processing-java --sketch=`pwd`/imgcreat --run';
  exec(cmd, processing);
  function processing() {
    var filename = 'imgcreat/output.png';
    var param = {
      encoding: 'base64'
    }
    var b64 = fs.readFileSync(filename, param);

  T.post('media/upload', {media_data: b64}, uploaded);

  function uploaded(err, data, response){
    //twit
    var id = data.media_id_string;
    var tweet = {
      status: 'image has been created', media_ids: [id]
    }

    T.post('statuses/update', tweet, tweeted);

  }

  function tweeted(err, data, response){
    if (err){
      console.log('something went wrong');
      }else {
        console.log('finished');
      }
    

  }

}
}
