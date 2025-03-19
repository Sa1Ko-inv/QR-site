"use client"
// Остановился на 2:14:50
import { useContext, useState } from "react"
import { Context } from "@/index"
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { GROUPS_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "@/utils/consts"
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const { user } = useContext(Context)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate();

    // Функция выхода из аккаунта
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole(null);
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate(LOGIN_ROUTE);
    }


    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate(HOME_ROUTE)} style={{cursor: 'pointer'}}>
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
                                <Nav.Link className="mb-2 mb-lg-0">
                                    <Button
                                        variant="primary"
                                        className="w-100"
                                        onClick={() => navigate(GROUPS_ROUTE)}
                                    >
                                        Группы
                                    </Button>
                                </Nav.Link>
                                <Nav.Link href='#' className="mb-2 mb-lg-0">
                                    <Button
                                        variant="primary"
                                        // onClick={() => navigate('/groups')}
                                        className="w-100"
                                    >
                                        Лекции
                                    </Button>
                                </Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end">
                                {/*<Nav.Link className="mt-2 mt-lg-0">*/}
                                {/*    <Button*/}
                                {/*        variant="outline-primary"*/}
                                {/*        className="w-100"*/}
                                {/*        onClick={() => navigate(LOGIN_ROUTE)}*/}
                                {/*    >*/}
                                {/*        Авторизация*/}
                                {/*    </Button>*/}
                                {/*</Nav.Link>*/}
                                <Nav.Link className="mt-2 mt-lg-0">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => logOut()}
                                        className="w-100"

                                    >
                                        Выход
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

