import { FC } from 'react';
import { ITodo } from '../../models/todo';
import { useAppDispatch } from '../../hooks/reduxHooks';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import { changeStatusTodo, removeTodo } from '../../store/slices/todoSlice';
import editIcon from '../../assets/edit.png';
import './TodoItem.scss';

interface TodoItemProps {
    todo: ITodo;
    onOpenModal: (id: string) => void;
}

const TodoItem:FC<TodoItemProps> = ({ todo, onOpenModal }) => {
    const dispatch = useAppDispatch();

    const onChangeStatus = (id: string) => {
        dispatch(changeStatusTodo(id))
    }

    const onRemove = (id: string) => {
        dispatch(removeTodo(id))
    }

    return (
        <li className={todo.status ? 'todo todo--completed' : 'todo'}>
            <div className="todo__head">
                <h2 className='todo__title'>{todo.title}</h2>
                <div className='todo__buttons'>
                    <img
                        src={editIcon}
                        className='todo__edit'
                        alt='edit'
                        onClick={() => onOpenModal(todo.id)}
                    />
                    <CloseButton onClick={() => onRemove(todo.id)} />
                </div>
            </div>
            <p className='todo__description'>{todo.description}</p>
            <Form.Check
                className='todo__checkbox'
                type='checkbox'
                label={todo.status ? 'completed' : 'In process'}
                onChange={() => onChangeStatus(todo.id)}
                checked={todo.status}
            />
        </li>
    )
}

export default TodoItem;