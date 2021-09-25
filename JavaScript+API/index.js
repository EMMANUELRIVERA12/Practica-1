function Leer() {
    const city = document.getElementById("input").value;
    //obtain an apikey on this web
    //http://www.omdbapi.com/apikey.aspx
    const key='0b6ff3b15c84fe9be9d7b6027898ecc5';
    const api_url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    buscar3(api_url);
}

/*function buscar1(api_url){

    fetch(api_url)
      .then(data => {
        return data.json()
      }).then(resultado=>{
            console.log(resultado);

            const {Search=[]} = resultado;
            
            console.log(Search);
            document.getElementById("lista").innerHTML='';

            Search.map((p)=>{
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
    
            </div>`;
            })
      });


}

const buscar2=async(api_url)=>{

    const data= await fetch(api_url);
    const respuesta= await data.json();
    const Search = await respuesta.Search;

    console.log(Search);

    if(Search!=null)
    {   
        document.getElementById("lista").innerHTML='';
        Search.map((p)=>{
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    <img width='100%' src=${p.Poster} alt="No hay poster"></img></div>`;
        })

    }

}    */

     
const buscar3=async(api_url)=>{

    const respuesta= await fetch(api_url);
    const Search = await respuesta.json();
    console.log(respuesta.data);

    console.log(Search);

    
    if(Search!=null)
    {
       // document.getElementById("lista").innerHTML='';
        
                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    </div>`;
                    
                    document.getElementById("lista").innerText=Search.main.temp + "°C";

    }

}    
