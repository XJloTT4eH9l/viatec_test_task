import { useState } from 'react';
import ModalTodo from '../ModalTodo/ModalTodo';
import Button from 'react-bootstrap/Button';
import './Header.scss';

const Header = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <header className="header">
            <div className="header__inner">
                <h1 className="header__title">Todo</h1>
                <Button variant="light" onClick={() => setShowModal(true)}>Add new todo</Button>
            </div>

            <ModalTodo
                type='addTodo'
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </header>
    )
}

export default Header;