function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var LugarDenacimiento = document.getElementById("Input3").value;
    var Equipo = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var alumno = {
            id, //matricula:id    id:id
            nombre,//nombre:nombre
            LugarDenacimiento,
            Equipo,
        }

        var lista_Jugadores=JSON.parse(localStorage.getItem("Jugadores"));

        if(lista_Jugadores==null)
        { 
            var lista_Jugadores = [];
        }
        
        const existe = lista_Jugadores.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_Jugadores=lista_Jugadores.filter(alumno=>alumno.id!=id);

            }
                
            lista_Jugadores.push(alumno);
            var temporal = lista_Jugadores.sort((a,b) => a.id-b.id);
            localStorage.setItem("Jugadores", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de alumno","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_Jugadores = JSON.parse(localStorage.getItem("Jugadores"));
    
     
    if(lista_Jugadores)
    {
        lista_Jugadores.forEach((alumno)=>printRow(alumno));
    }
}


function printRow(alumno){
    
    if(alumno!=null){
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
        cell1.innerHTML = alumno.id;
        cell2.innerHTML = alumno.nombre; 
        cell3.innerHTML = alumno.LugarDenacimiento;
        cell4.innerHTML = alumno.Equipo; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${alumno.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+alumno.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_Jugadores = JSON.parse(localStorage.getItem("Jugadores"));
    var temporal=lista_Jugadores.filter(alumno=>alumno.id!=id);
    localStorage.setItem("Jugadores", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Jugadores");
    }
  
    read();
    
}

function seekR(id){

    const lista_Jugadores = JSON.parse(localStorage.getItem("Jugadores"));
    var alumno=lista_Jugadores.filter(alumno=>alumno.id==id);
    //console.log(alumno[0]);
    updateR(alumno[0]);
}

function updateR(alumno){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=alumno.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=alumno.nombre;
        document.getElementById("Input3").value=alumno.LugarDenacimiento;
        document.getElementById("Input4").value=alumno.Equipo;
    }
}


//Para consulta de Equipo
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_Jugadores = JSON.parse(localStorage.getItem("Jugadores"));
    var JugadoresC=lista_Jugadores.filter(alumno=>alumno.Equipo==c);
    if(JugadoresC)
    {
        JugadoresC.forEach((alumno)=>printRowQ(alumno));
    }
    //console.log(JugadoresC)

}


function printRowQ(alumno){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.nombre; 
    cell3.innerHTML = alumno.LugarDenacimiento;
    cell4.innerHTML = alumno.Equipo; 
   
}