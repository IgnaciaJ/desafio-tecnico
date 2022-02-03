import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Restaurante</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="restaurant-name">Nombre</Label>
              <Input
                type="text"
                id="restaurant-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Nombre"
              />
            </FormGroup>
            <FormGroup>
              <Label for="restaurant-foodtype">Tipo de Restaurante</Label>
              <Input
                type="text"
                id="restaurant-foodtype"
                name="foodtype"
                value={this.state.activeItem.foodtype}
                onChange={this.handleChange}
                placeholder="Tipo de restaurante"
              />
            </FormGroup>
            <FormGroup>
              <Label for="restaurant-city">Ciudad</Label>
              <Input
                type="text"
                id="restestaurant-city"
                name="city"
                value={this.state.activeItem.city}
                onChange={this.handleChange}
                placeholder="Ingresa la Ciudad"
              />
              </FormGroup>
            <FormGroup>
            <Label for="restaurant-country">País</Label>
              <Input
                type="text"
                id="restaurant-country"
                name="country"
                value={this.state.activeItem.country}
                onChange={this.handleChange}
                placeholder="Ingresa el País"
              />
            </FormGroup>
            <FormGroup>
              <Label for="restaurant-qualification">Calificación</Label>
              <Input
                type="number"
                step="0.1"
                min='0'
                max='100'
                id="restaurant-qualification"
                name="qualification"
                value={!this.state.activeItem.qualification? "" : this.state.activeItem.qualification}

                onChange={this.handleChange}
                placeholder="Calificación"
              />
   
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="visited"
                  checked={this.state.activeItem.visited}
                  onChange={this.handleChange}
                />
                Visitado
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}