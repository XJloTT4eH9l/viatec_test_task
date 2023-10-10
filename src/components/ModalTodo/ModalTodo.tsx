import { useState, FC } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTodo, editTodo } from '../../store/slices/todoSlice';
import { ITodo } from '../../models/todo';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface ModalTodoProps {
    type: string;
    currentTodo?: ITodo;
    showModal: boolean;
    setShowModal: (item: boolean) => void;
}

const ModalTodo: FC<ModalTodoProps> = ({ type, currentTodo, showModal, setShowModal }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false);

    const onCloseModal = () => {
        setTitle('');
        setDescription('');
        setShowModal(false);
    }

    const onSubmit = () => {
        if (type === 'addTodo') {
            const currentDate = new Date;
            if (title.length !== 0) {
                dispatch(addTodo({
                    id: currentDate.toISOString(),
                    title,
                    description,
                    status
                }))
                setShowModal(false);
                setTitle('');
                setDescription('');
                setStatus(false);
            }
        }
        if (type === 'editTodo') {
            if (title.length !== 0 && currentTodo) {
                dispatch(editTodo({
                    id: currentTodo.id,
                    title,
                    description,
                    status
                }))
                setTitle('');
                setDescription('');
                setStatus(false);
                setShowModal(false);
            }
        }
    }
    return (
        <Modal
            show={showModal}
            onHide={onCloseModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>{type === 'addTodo' ? 'Add new todo' : `Edit "${currentTodo && currentTodo.title}"`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type title"
                            autoFocus
                            value={title}
                            maxLength={30}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className='textarea'
                            as="textarea"
                            rows={3}
                            maxLength={300}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Status</Form.Label>
                        <Form.Check
                            className='todo__checkbox'
                            type='checkbox'
                            onChange={() => setStatus(prev => !prev)}
                            checked={status}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    {type === 'addTodo' ? 'Add' : 'Edit'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalTodo;