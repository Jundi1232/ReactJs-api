
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import { NavbarComponent, ListCategories, Hasil, Menu } from './component'
import React, { Component } from 'react'
import { API_URL } from './utils/constants'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: [],
    }
  }
  componentDidMount() {
    axios
      .get(API_URL + "products")
      .then(res => {
        const menu = res.data;
        this.setState({ menu });
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    const { menu } = this.state
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories />
              <Col>
                <h4 className="float-right"><strong>Daftar Menu </strong> </h4>
                <hr />
                <Row>
                  {menu && menu.map((menu) => (
                    <Menu
                      key={menu.id}
                      menu={menu}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
