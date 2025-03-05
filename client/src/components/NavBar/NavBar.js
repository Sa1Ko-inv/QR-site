"use client"

import { useContext, useState } from "react"
import { Context } from "@/index"
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { GROUPS_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "@/utils/consts"

const NavBar = () => {
    const { user } = useContext(Context)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand href={HOME_ROUTE}>
                        <img alt="" src="QR-icons.png" width="40" height="40" className="d-inline-block align-top" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" onClick={handleShow} />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-lg"
                        aria-labelledby="offcanvasNavbarLabel-expand-lg"
                        placement="end"
                        show={show}
                        onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Меню</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-start flex-grow-1 pe-3">
                                <Nav.Link href={GROUPS_ROUTE} className="mb-2 mb-lg-0">
                                    <Button variant="primary" className="w-100">
                                        Группы
                                    </Button>
                                </Nav.Link>
                                <Nav.Link href='#' className="mb-2 mb-lg-0">
                                    <Button variant="primary" className="w-100">
                                        Пользователи
                                    </Button>
                                </Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end">
                                <Nav.Link href={LOGIN_ROUTE} className="mt-2 mt-lg-0">
                                    <Button variant="outline-primary" className="w-100">
                                        Авторизация
                                    </Button>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar

