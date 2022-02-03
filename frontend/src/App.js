import React, { Component} from "react";
import Modal from "./components/Modal";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  FormGroup,
 
} from "reactstrap";


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      viewVisited: false,
      filter:"",
      city:"",
      RestaurantList: [],
      key: null,
      direction: "ascending",
      FilteredList: [],
      modal: false,
      activeItem: {
        name: "",
        qualification: "",
        country: "",
        city: "",
        visited: false,
      },
    };
  }


  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/restaurants/")
      .then((res) => this.setState({ RestaurantList: res.data}))
      .catch((err) => console.log(err));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onChangeSearchType = (e) => {
    this.setState({ filter: e.target.value});
  };

  onChangeSearchCity = (e) => {
    this.setState({ city: e.target.value});
    this.findByCity(e);
  };

  findByCity = (e) => {
    axios.get(`/restaurants/?city=${e.target.value}`)
      .then((res) => {
        this.setState({ city: e.target.value});
        this.setState({FilteredList: res.data});
        this.refreshList();
      })
      return;
    };

  

  onItemCheck(e, item) {
    let tempList = this.state.RestaurantList;
    tempList.map((rest) => {
      if (rest.id === item.id) {
        rest.visited = e.target.checked;
        axios
        .put(`/restaurants/${rest.id}/`, rest)
        .then((res) => this.refreshList());
        return rest;
      }
    });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.visited === undefined){
      item.visited = false;
    }
    if (!item.visited && (item.qualification === "" || item.qualification === null)){
      item.qualification = null;
    };
    if (item.id) {
      axios
        .put(`/restaurants/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/restaurants/", item)
      .then((res) => this.refreshList());
  };
  
  requestSort = key => {
    let direction = 'ascending';
    if (this.state.key === key && this.state.direction === 'ascending') {
      direction = 'descending';
    }
    this.setState({ key: key, direction: direction});
  }
  handleDelete = (item) => {
    axios
    .delete(`/restaurants/${item.id}/`)
    .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { name: "", foodtype: "", city: "", country: "", qualification:null, completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayVisited = (status) => {
    if (status) {
      return this.setState({ viewVisited: true });
    }

    return this.setState({ viewVisited: false });
  };


  displayAll = () => {
      return this.setState({ viewVisited: "todos"});
  };

  renderTabList = () => {
    return (
      
      <div className="nav nav-tabs thead-light nav-tabs-dar">


      <table class="table-dark  thead-light">
     
      <tr>
        
    <th>
        <span
          className={this.state.viewVisited === true ? "nav-link active" : "nav-link"}
          onClick={() => this.displayVisited(true)}
        >
            Visitado
        </span>
        </th>
        <th>
        <span
          className={this.state.viewVisited ? "nav-link" : "nav-link active"}
          onClick={() => this.displayVisited(false)}
        >
          Sin Visitar
        </span></th>
        <th>
        <span
          className={this.state.viewVisited === "todos" ? "nav-link active" : "nav-link"}
          onClick={() => this.displayAll()}
          >
            Todos
        </span></th>
        <th><span>
           Buscar por 🔎:
        </span></th>
        <th>
        <div class="col-xs-2">
      <input
          class= "form-control form-control-sm"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={this.state.filter}
          type="text"
          placeholder="Tipo de restaurante"
          name="type-f"
          onChange={this.onChangeSearchType}
        >
        
      </input>
      </div>
      </th>
      <th>
    <div>
      <input
          class= "form-control form-control-sm"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          name="city-f"
          value={this.state.city}
          placeholder="Ciudad"
          type="text"
          onChange={this.onChangeSearchCity}
        >
      </input>
      
    </div>
    
    </th>
    <th>     </th>
    <br/>
        </tr>
    </table>
      </div>
      
      
    );
  };
  

  renderItems = (field) => {
    const { viewVisited } = this.state;
    let newItems;

    if (this.state.city === ""){
      if (this.state.viewVisited === "todos"){
        newItems = this.state.RestaurantList.filter(
          (item) => item.foodtype.toUpperCase().includes(this.state.filter.toUpperCase()),
      );
      } else {
        newItems = this.state.RestaurantList.filter(
          (item) => item.visited === viewVisited && item.foodtype.toUpperCase().includes(this.state.filter.toUpperCase()),
      );
    } }
    else {
      if (this.state.viewVisited === "todos"){
        newItems = this.state.FilteredList.filter(
          (item) => item.foodtype.toUpperCase().includes(this.state.filter.toUpperCase()),
      );
      } else {
        newItems = this.state.FilteredList.filter(
          (item) => item.visited === viewVisited && item.foodtype.toUpperCase().includes(this.state.filter.toUpperCase()),
      );
      };
    };

    if (this.state.key !== null) {
      newItems.sort((a, b) => {
    if (typeof a[this.state.key] === "string" ){
      if (a[this.state.key].toUpperCase() < b[this.state.key].toUpperCase()) {
        return this.state.direction === 'ascending' ? -1 : 1;
      }
      if (a[this.state.key].toUpperCase() > b[this.state.key].toUpperCase()) {
        return this.state.direction  === 'ascending' ? 1 : -1;
      }
      return 0;
    } else {
      if (a[this.state.key] < b[this.state.key]) {
        return this.state.direction === 'ascending' ? -1 : 1;
      }
      if (a[this.state.key] > b[this.state.key]) {
        return this.state.direction  === 'ascending' ? 1 : -1;
      }
      return 0;
    };
      })
    };
    return newItems.map((item) => (
      <tr>
          <th scope="row">{item.name}</th>
          <td>{item.foodtype}</td>
          <td>{item.city}, {item.country}</td>
          <td>{item.qualification}</td>
          <td> 
            
            <FormGroup check>
              
                <input
                  type="checkbox"
                  name="visited"
                  checked={item.visited}
                  onChange={(e) => this.onItemCheck(e, item)}
                />
                
            </FormGroup>
          </td>
          
        
          <td><button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Editar
          </button></td>
          <td><button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Eliminar
          </button></td>
        
      </tr>
    ));
  };

  render() {
    return (
      
      <main>

      <nav className="navbar navbar-expand-lg navbar-collapse navbar-light bg-light">
        <a href="/" className="navbar-brand"><strong>
          @MejorConTocinoReviews🍔🍸🍣🥑
          </strong></a>
        <div className="navbar-nav mr-auto">
        </div>
      </nav>
      <div class="image" >
      <br/>
      <br/>
      <div class="container">
          {/* <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
              <div className="mb-4">  */}
            
                
              {this.renderTabList()}
              <table class="table table-dark thead-light table-striped">
              <thead>
                <tr>
                  <th>
                    <button class="btn btn-dark mr-2" onClick={() => this.requestSort('name')}>
                      Nombre
                    </button>
                  </th>
                  <th>
                    <button class="btn btn-dark mr-2" onClick={() => this.requestSort('foodtype')}>
                      Tipo de Restaurante
                    </button>
                  </th>
                  <th>
                    <button class="btn btn-dark mr-2" onClick={() => this.requestSort('city')}>
                      Ubicación
                    </button>
                  </th>
                  <th>
                    <button class="btn btn-dark mr-2" onClick={() => this.requestSort('qualification')}>
                      Calificación
                    </button>
                  </th>
                  <th>
                    <button class="btn btn-dark mr-3" onClick={() => this.requestSort('visited')}>
                      Visitado
                    </button>
                  </th>
                  <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
                </tr>
              </thead>
              
             
              <tbody>
           
                {this.renderItems()} 
             
              </tbody>
              </table>
              <div class="col-md-12 text-center">
                <div><button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Agregar Restaurant
                </button></div><br/>
                </div>
              </div>
              </div>
             
        {this.state.modal ? (

          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;