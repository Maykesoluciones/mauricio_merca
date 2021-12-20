  // Authentication
  url = "https://realtime.ably.io/event-stream?";
  version = "1.2"
  username = "VRDsGQ.B_CYIQ";
  password = "dPUOfDfiuRQrRSX9wt1fcYc9v-AKBdGQa2jTP60_D5g";
  topic_raiz = "ok";
  topic_datos_lamparas = "/lamparas";

    // // Mensajes
    mensaje_inicial = "Desconectado"
    clientId=  " WEB FAM-MERCADO--->> " + Math.floor((Math.random() * 1000000) + 1);
 

  var ably = new Ably.Realtime(username+':'+password);

var channel = ably.channels.get(topic_raiz);
channel.publish(clientId, mensaje_inicial);

  //recibir mensajes de los topicos suscritos

var conexion = url+'channels='+topic_raiz+'&v='+version+'&key='+username+':'+password;
var eventSource = new EventSource(conexion);
eventSource.onmessage = function(event) {
var message = JSON.parse(event.data);

  var topic = message.channel;
// Decodificar mensaje
var decodedString = atob(message.data);
console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 
  
    if (topic == topic_raiz){
      var splitted = message.toString().split(",");
      var conex = splitted[0];

      $("#display_conexion").html(conex);
    }
  
var channel = ably.channels.get(topic_raiz);
channel.publish(clientId, mensaje_inicial);

};

var conexion = url+'channels='+topic_raiz+topic_datos_lamparas+'&v='+version+'&key='+username+':'+password;
var eventSource = new EventSource(conexion);
eventSource.onmessage = function(event) {
  var message = JSON.parse(event.data);

  var topic_lamp =  message.channel;

// Decodificar mensaje
var decodedString = atob(message.data);
console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 

if (topic_lamp == topic_raiz + topic_datos_lamparas){
    var splitted = message.toString().split(",");
    var switch1 = splitted[0];
 
    if(switch1 == "1"){
      $("#display_sw1").prop('checked', true);
    }else{
      $("#display_sw1").prop('checked',"");
    }
  
}
};

  ////////////////////////////////////////////////////////

  function sw1_change(){   
  var channel = ably.channels.get('ok/actions/sw1');
   var inputChecked_sw1;
    
   if ($('#display_sw1').is(":checked")){
     console.log("Mensaje sw1 1");
     channel.publish('', '1');
    } else{
     console.log("Mensaje sw1 0")
     channel.publish('', '0');
    }    
  }
