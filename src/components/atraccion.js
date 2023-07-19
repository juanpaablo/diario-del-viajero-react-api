import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
function Atraccion (){
 const url= "http://localhost:4000/atracciones"
 const [NewAtraccion, setNewAtraccion] = useState({
   name:"",
   direccion:"",
   img:"",
   caracteristica:"",
 });
 const [selectoptions, setSelectedOption] = useState("")
 //el e.target.name hace referencia a la propiedad del input del html basicamente captura lo que haya en ese input con el nombre y lo pasa a la database
 const handleChange = (e) => {
  //este if dice que si el input se llama caracteristica este seteara lo que ponga en el state
  //sino se llaman asi es por que es otro campo 
  if (e.target.name === "caracteristica") {
    setSelectedOption(e.target.value);
  } else {
    setNewAtraccion({
      ...NewAtraccion,
      [e.target.name]: e.target.value,
    });
  }
};
const addAtraccion = async (e) => {
  e.preventDefault();
  
  const atraccioncaract = {
    ...NewAtraccion,
    caracteristica: selectoptions
  }
  
  
  const existingAtraccion = await axios.get(url);
  const duplicatedAtraccion = existingAtraccion.data.find(atraccion => atraccion.direccion === atraccioncaract.direccion);

  if (duplicatedAtraccion) {
    alert("La dirección de atracción ya está en uso");
    return; 
  }
  
  const response = await axios.post(url, atraccioncaract);
  console.log(response);
  
  if (response.status === 200) {
    alert(NewAtraccion.name + " se agregó correctamente ");
    resetform();
  } else {
    alert("Error al crear una nueva atracción");
    alert("Intente nuevamente más tarde");
  }



}
const resetform =() =>{
    setNewAtraccion({
        name:"",
        direccion:"",
        img:"",
        caracteristica:""
    })
}
return (
    <div className="container">
      <form onSubmit={addAtraccion}>
        <div className="form-group">
          <label className="label"> Name: </label>
          <input
            className="input"
            placeholder="insert the name of the attraction"
            type="text"
            name="name"
            onChange={handleChange}
            value={NewAtraccion.name}
            required
          />
        </div>
        <div className="form-group">
          <label className="label"> direccion: </label>
          <input
            className="input"
            placeholder="Insert direccion"
            type="text"
            name="direccion"
            value={NewAtraccion.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label"> image: </label>
          <input
            className="input"
            placeholder="insert image url"
            type="text"
            //hace referencia a esto
            name="img"
            value={NewAtraccion.img}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label"> caracteristica: </label>
          <select
  value={selectoptions}
  onChange={handleChange}
  name="caracteristica"
>
  <option value="">Todos</option>
  <option value="natural">Natural</option>
  <option value="urbano">Urbano</option>
</select>
        </div>

        <button type="submit" className="button">
          ADD
        </button>
        <br/> 
        <br/> 
        
        

        
      </form>

      <Link to="/"> <button> ver las atrraciones registradas</button> </Link>
    </div>
    
  );


}

export default Atraccion;