import React,{useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
function EditarAtraccion(){
    const url = "http://localhost:4000/atracciones";
    const Getlist = async () =>{
        const response = await axios.get(url);
        return response
    }
    const [list, setlist]= useState([])
    const [atraccion, setatraccion] = useState({
        name:"",
        img:"",
        direccion:"",
        id:"",
        caracteristica:""
    })
    useEffect(() => {
        Getlist().then((response) => {
          setlist(response.data);
        });
      }, []);
      //handleselect sirve para encontrar los datos de atraccion y plasmarlos para poder editarlos
      //basicamente busca todas las atracciones con los datos a editar
      //list tiene todos los datos de la database
    const handleselect = (e) =>{
        const select = list.find(atraccion =>atraccion.name === e.target.value )
        setatraccion({
            id:select.id,
            name:select.name,
            direccion:select.direccion,
            img:select.img,
            caracteristica:select.caracteristica
        })
        return console.log(select)
    }
    //esta funcion actualiza los nuevos detalles que pondre
    const handleChange = (e) =>{
        setatraccion ({...atraccion, [e.target.id]: e.target.value, })
    }

    const edit = async (e) =>
  { e.preventDefault();
    const res = await axios.put(url+'/'+atraccion.id,atraccion)
    if(res.status === 200){alert('atraccion editada'); window.location.reload() } else if(res.status===404){
        alert("para poder editar necesita seleccionar una atraccion")
    }
  } 

  return (
    <div className='input'>
      <select className='select' onChange={handleselect}>
        {list.map(atraccion => <option key={atraccion.id}>{atraccion.name}</option>)}
      </select>

    <form onSubmit={edit}>
    <br></br>
    <label>name: </label>
    <input value={atraccion.name} type='text' name='name' id="name" onChange={handleChange}></input>
    <br></br>
    <label>direccion: </label>
    <input value={atraccion.direccion} type='text' name='direccion' id="direccion" onChange={handleChange}></input>
    <br></br>
    <label>imagen: </label>
    <input value={atraccion.img} type='text' name='img' id="img" onChange={handleChange}></input>
    <br></br>
    <input value={atraccion.caracteristica} type='text' name='caracteristica' id="caracteristica" onChange={handleChange}></input>
    <br></br>
    <br></br>
    <button type='submit'>EDIT</button>
    <Link to={"/"}> <button> volver a la pagina principal</button>   </Link>
    </form>
    </div>
  )
    }
    export default EditarAtraccion
    

