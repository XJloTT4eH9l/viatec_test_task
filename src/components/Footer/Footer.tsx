import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearCompleted } from '../../store/slices/todoSlice';
import { changeFilter } from '../../store/slices/filterSlice';
import Button from 'react-bootstrap/Button';
import './Footer.scss';

const Footer = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todos.todos);
    const filters = useAppSelector(state => state.filters.filters);
    const activeFilter = useAppSelector(state => state.filters.acttiveFilter);

    const checkInProcessTodo = () => {
        const quantityActive = todos.filter(todo => todo.status === false);
        return `${quantityActive.length} items left`;
    }

    const onClear = () => dispatch(clearCompleted());

    const onFilter = (filter: string) => {
        dispatch(changeFilter(filter));
    }

    return (
        <footer className='footer'>
            <div className="footer__quantity">{checkInProcessTodo()}</div>
            <ul className="footer__filter">
                {filters.map(filter => (
                    <li 
                        key={filter}
                        className={activeFilter === filter ? 'footer__item footer__item--active' : 'footer__item'}
                        onClick={() => onFilter(filter)}
                    >
                        {filter}
                    </li>
                ))}
            </ul>
            <Button onClick={onClear} variant='danger'>Clear completed</Button>
        </footer>
    )
}

export default Footer;