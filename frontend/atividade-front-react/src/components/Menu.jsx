import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Menu() {
      return (
            <Navbar bg="dark" expand="lg" variant='dark'>
                  <Container>
                        <Navbar.Brand as={NavLink} to="/">CRUD65</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                    <Nav.Link activeClassName='active' as={NavLink} to='/cliente/lista'>Clientes</Nav.Link>
                                    <Nav.Link activeClassName='active' as={NavLink} to='/atividade/lista' s>Atividades</Nav.Link>
                              </Nav>
                              <Nav>
                                    <NavDropdown title="Vinicius" id="basic-nav-dropdown" align="end">
                                          <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                                          <NavDropdown.Item href="#action/3.2">
                                                Configurações
                                          </NavDropdown.Item>
                                          <NavDropdown.Item href="#action/3.3">Sair</NavDropdown.Item>
                                    </NavDropdown>
                              </Nav>
                        </Navbar.Collapse>
                  </Container>
            </Navbar>
      );
}
