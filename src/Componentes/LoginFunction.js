import React, {useState } from "react";
// import Insert from "./Insert";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


function LoginFunction() {
    
    const [usuario,setUsuario] = useState("");
    const [pas, setPas] = useState("");
    const [mensajeError,setMensajeError] = useState("")

    const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
    }

    const cambiarPas = (e) => {
        setPas(e.target.value);
    }

    const handleSubmit = (event) =>{
        
        const datos = new FormData();
        datos.append('usuario' , usuario);
        datos.append('pas', pas);
        fetch("http://localhost:80/chatFinal/chat/db/login.php", {
            method: "POST",
            body: datos
        })
        .then(res => res.json())
        .then(data =>{           
            localStorage.setItem('id',data);
            setMensajeError("Usuario correcto");
            window.location.href="/insert";            
        })
        
        .catch(error => setMensajeError("Usuario o contraseña incorrecto"))
        
        event.preventDefault();
    }
        return(
            <form>

            <h3>Log in</h3>

            <div className="form-group">
                <label>Usuario</label>
                <input type="text" className="form-control" placeholder="Usuario"  onChange={cambiarUsuario}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Contraseña" onChange={cambiarPas} />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit}>Sign in</button>
            <p>{mensajeError}</p>
        </form>

        )
    }



export default LoginFunction;