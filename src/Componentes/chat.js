import React, { useState} from "react";
import  "../estilos.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function Chat (){          
    const [mensajes,setMensaje] = useState([]);    
    
    
    useState(() => {
        fetch("http://localhost:80/chatFinal/chat/db/consulta.php")
        .then(res => res.json())
        .then(
            (result) => {
                setMensaje(result)
                    
            }
        )
        
            
        
    });

    const eliminar = (event) =>{
        const datos = new FormData(); 
        datos.append('mensaje',event.target.value);
        fetch("http://localhost:80/chatFinal/chat/db/eliminar.php", {
            method: "POST",
            body: datos
        })
        .then(res => res.json())
        .then(data =>{ 
            console.log(data) ;         
            window.location.reload();
        })        
        .catch(error => console.log(error));            
    } 

    const vaciar = () =>{
        fetch("http://localhost:80/chatFinal/chat/db/eliminarTodo.php")
        .then(res => res.json())
        .then(data =>{ 
            console.log(data) ;         
            window.location.reload();
        })        
        .catch(error => console.log(error));  
    }
    
    
        return(
            <>
              
                <div className='chat'>
                                            
                {mensajes.map(el=>{
                    if(el.Nombre === localStorage.getItem('usuario')){
                        return <div  className="propio" key = {el.NumeroMens}><p >{el.Nombre}: {el.Mensaje} <button className="btn btn-success  btn-sm" value={el.NumeroMens} onClick={eliminar}>Eliminar</button></p></div>
                    }else{
                        return <div className="otro" key = {el.NumeroMens}><p  >{el.Nombre}: {el.Mensaje} <button className="btn btn-success btn-sm " value={el.NumeroMens} onClick={eliminar}>Eliminar</button></p> </div>
                    }
                } )}  
                       
                                                  
                </div>

                <button onClick={vaciar}>Eliminar Todo</button>
            </>
        );
    
}


export default Chat;