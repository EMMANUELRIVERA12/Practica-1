var firebaseConfig = {
    apiKey: "AIzaSyB4V20Zd02do1adfndk2XMwbxhMb5e_7z0",
  authDomain: "riverafirebase.firebaseapp.com",
  databaseURL: "https://riverafirebase-default-rtdb.firebaseio.com",
  projectId: "riverafirebase",
  storageBucket: "riverafirebase.appspot.com",
  messagingSenderId: "804924779868",
  appId: "1:804924779868:web:77e0c8ac198851f3f0e599",
  measurementId: "G-RY1LRM02HF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var Equipo = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Jugador = {
            id, //matricula:id
            nombre,
            correo,
            Equipo,
        }

        //console.log(Jugador);

        firebase.database().ref('Jugadores/' + id).update(Jugador).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Jugadores').push().key;
    //data[`Jugadores/${key}`]= Jugador;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Jugadores');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Jugador){
    
    if(Jugador!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Jugador.id;
        cell2.innerHTML = Jugador.nombre; 
        cell3.innerHTML = Jugador.correo;
        cell4.innerHTML = Jugador.Equipo; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Jugador.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Jugador.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Jugadores/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Jugadores/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Jugador){
    if(Jugador!=null)
    {
        document.getElementById("Input1").value=Jugador.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Jugador.nombre;
        document.getElementById("Input3").value=Jugador.correo;
        document.getElementById("Input4").value=Jugador.Equipo;
    }
}


//Para consulta de Equipo
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Jugadores");
    ref.orderByChild("Equipo").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Jugador){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Jugador.id;
    cell2.innerHTML = Jugador.nombre; 
    cell3.innerHTML = Jugador.correo;
    cell4.innerHTML = Jugador.Equipo; 
   
}