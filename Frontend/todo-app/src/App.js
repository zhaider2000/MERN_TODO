import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { React, useState ,useEffect} from "react";
import { Modal} from "react-bootstrap";


function App() {
  const [data, setdata] = useState( [{}] )
  const [description, setdescription] = useState("");
  const [updateDescp, setupdateDescp] = useState("");
  const [updateObj, setupdateObj] = useState({});


  const createTodo = async () => {
    try{
    console.log("here at button click");
    console.log(description);
    const response=await fetch("http://localhost:3000/create",{
      method: "POST",
      headers:{
          "Content-Type":"application/JSON"
      },
      body: JSON.stringify({
          description
      })
    })
    const data= await response.json()
    console.log(data)
    window.location.reload()

  }catch(err){
    console.log(err)
  }
  }


  const getTodos=async()=>{

    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
    })
    const data = await response.json()
    setdata(data)

  }


  const deleteTodo=async(obj)=>{
    try{
    console.log(obj)
    const response=await fetch("http://localhost:3000/delete",{
      method: "DELETE",
      headers:{
          "Content-Type":"application/JSON"
      },
      body: JSON.stringify(obj)
    })
    const message=await  response.json()
    console.log(message)
    window.location.reload()
  }catch(err){
    console.log(err)
  }
}




const updateTodo=async()=>{
  console.log(updateObj)
  console.log(updateDescp)
  const id=updateObj._id
  const response=await fetch("http://localhost:3000/update",{
    method: "PUT",
    headers:{
        "Content-Type":"application/JSON"
    },
    body: JSON.stringify({
      id,updateDescp
    })
  })
  const data= await response.json()
  console.log(data)
  window.location.reload()


}


  const [showModal, setShow] = useState(false);

  const handleClose = () => {
  setShow(false);
  }
  const handleShow = (obj) => {
    setupdateObj(obj)  
    setupdateDescp(obj.description)
    setShow(true);
  }
  useEffect(() => {
    getTodos()
  }, []);
  

  return (
    <div className="page-essentials">
      <h3 className="text-center title">Salsoft Todos!</h3>
      <div className="container">
        <div className="col-lg">
          <div className="row">
            <div className="col-sm">
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-sm">
              <button
                type="button"
                className="btn btn-success"
                onClick={createTodo}
              >
                Create
              </button>
            </div>
          </div>
          <div>
          {
            data.map((obj)=>(
            <div className="row">
            <div className="col-sm-6">
              <h3>{obj.description}</h3>
            </div>
            <div className="col-md-auto">
              <button
                type="button"
                className="btn btn-success"
                onClick={()=>handleShow(obj)}
              >
                Update
              </button>
            </div>
            <div className="col-md-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={()=>deleteTodo(obj)}
              >
                Delete
              </button>
            </div>
            <hr/>
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            name="description"
            value={updateDescp}
            onChange={(e) => {
              setupdateDescp(e.target.value);
            }}
          />
            </Modal.Body>
            <Modal.Footer>
            <button
            type="button"
            className="btn btn-success"
            onClick={()=>updateTodo()}
          >
            Update
          </button>
            </Modal.Footer>
          </Modal>
          </div>
            ))
          }
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
