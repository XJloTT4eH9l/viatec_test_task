import { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ITodo } from '../../models/todo';
import ModalTodo from '../ModalTodo/ModalTodo';
import TodoItem from '../TodoItem/TodoItem';

const List = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const currentFiler = useAppSelector(state => state.filters.acttiveFilter);
    const [currentTodo, setCurrentTodo] = useState<ITodo>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const onOpenModal = (id: string) => {
        const todo = todos.find(todo => todo.id === id);
        if(todo) {
            setCurrentTodo(todo);
        }
        setShowModal(prev => !prev);
    }

    const onFilter = () => {
        switch(currentFiler) {
            case 'All': return todos
            case 'Completed': return todos.filter(todo => todo.status === true);
            case 'In process': return todos.filter(todo => todo.status === false);
            default: return todos
        }
    }

    return (
        <>
            <ul className="list">
                {onFilter().map(todo => (
                    <TodoItem
                        key={todo.id} 
                        todo={todo}
                        onOpenModal={onOpenModal}
                    />
                ))}
            </ul>

            <ModalTodo
                type='editTodo'
                showModal={showModal}
                setShowModal={setShowModal}
                currentTodo={currentTodo} 
            />
        </>
    )
}

export default List;