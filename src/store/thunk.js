// Импортируем все как namespace
import * as reduxThunk from 'redux-thunk';

// Если свойство default существует и является функцией – используем его, иначе reduxThunk сам
const thunk = typeof reduxThunk.default === 'function' ? reduxThunk.default : reduxThunk;

export default thunk;
