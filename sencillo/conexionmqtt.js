 // connect options
  topic_raiz           = "KLk4gLSS1PxnwiY"
  topic_reloj          = "/reloj"
  topic_variables      = "/datos_variables"
  topic_accion_botones = "/actions/#"
  topic_datos_lamparas = "/datos_lamparas"

  // // Mensajes
  mensaje_inicial = "Desconectado"
  resultado_1 = "1"
  resultado_2 = "0"

const options = {
  connectTimeout: 4000,
  // Authentication
  clientId:  " WEB FAM-MERCADO--->> " + Math.floor((Math.random() * 1000000) + 1),
  username: 'M8jvrOCfWEmHLAc',
  password: 'qy4mV3eaEjzaFYb',
  keepalive: 60,
  clean: true,
}

  // WebSocket connect url

  //const WebSocket_URL = 'ws://broker.emqx.io:8083/mqtt'

   const WebSocket_URL = 'wss://ioticos.org:8094/mqtt'
  //const WebSocket_URL = 'wss://broker.shiftr.io:443/mqtt'

  // TCP/TLS connect url
  //const TCP_URL = 'mqtt://broker.shiftr.io:443'
  //const TCP_TLS_URL = 'mqtts://localhost:8883'

  const client = mqtt.connect(WebSocket_URL, options)

  client.on('connect', () => {
    console.log('Conexion Exitosa')
    //client.subscribe(topic_raiz + topic_variables)
    client.subscribe(topic_raiz)
   client.subscribe(topic_raiz + topic_reloj)
    //client.subscribe(topic_raiz + topic_accion_botones)
    client.subscribe(topic_raiz + topic_datos_lamparas)

    client.publish(topic_raiz,mensaje_inicial, (error) => {
      console.log(error || 'Publicacion Exitosa')
    })
  })

  client.on('reconnect', (error) => {
    console.log('Reconectado MQTT:', error)

    client.publish(topic_raiz,mensaje_inicial, (error) => {
      console.log(error || 'Publicacion Exitosa')
    })
  })

  client.on('error', (error) => {
    console.log('Error de Conexion:', error)
  })

  //recibir mensajes de la tarjeta luces central
  client.on('message', (topic, message) => {
    console.log('receive message：', topic, message.toString())

    if (topic == topic_raiz){
      var splitted = message.toString().split(",");
      var conexion = splitted[0];
      document.getElementById("displayconexion").innerHTML = conexion;
    }
   
    if (topic == topic_raiz + topic_reloj){
      var splitted = message.toString().split(",");
      var reloj = splitted[0];
     var otro = splitted[1];
     if( reloj == "reloj"){
      updateDateTime();
     }
    }


    if (topic == topic_raiz + topic_datos_lamparas){
    var splitted = message.toString().split(",");

    var switch1 = splitted[0];
     var inputChecked_L1;

    if(switch1 == "1"){
      inputChecked_L1 = true;
      document.getElementById("display_sw1").checked = inputChecked_L1;
    }else{
      inputChecked_L1 = false;
      document.getElementById("display_sw1").checked = inputChecked_L1;
    }
  }
})
  ////////////////////////////////////////////////////////

  function sw1_change(){   
   var inputChecked_sw1;
   
   inputChecked_sw1 = document.getElementById("display_sw1").checked;
   
   if(inputChecked_sw1 == true){
     console.log("Mensaje sw1 1")
    	client.publish(topic_raiz + '/actions/sw1',"1",{ qos: 0, rein: false }, (error)=> {
      //console.log(error || 'Mensaje sw1 "1"')
    })
   }else{
     console.log("Mensaje sw1 0")
    	 client.publish(topic_raiz + '/actions/sw1',"0",{ qos: 0, rein: false }, (error)=> {
      //console.log(error || 'Mensaje sw1 "0"')
     })
    }
  }

function updateDateTime() {
  var currentdate = new Date(); 
  var datetime =  currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/" 
  + currentdate.getFullYear() + " Hora: "  
  + currentdate.getHours() + ":"  
  + currentdate.getMinutes() + ":" 
  + currentdate.getSeconds();
  document.getElementById("update-time").innerHTML = datetime;
  console.log(datetime);
}
