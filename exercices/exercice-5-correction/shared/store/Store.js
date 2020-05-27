import { createStore } from 'redux'
import App  from '../container/App'

export default function store() {
    const store = createStore(App);
    return store;
}