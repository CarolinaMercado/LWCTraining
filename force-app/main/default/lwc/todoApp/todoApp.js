import { LightningElement } from 'lwc';
import { ReduxElement } from 'c/lwcRedux';
import {todo} from 'c/todoAppActions';

export default class TodoApp extends ReduxElement(LightningElement) {
    connectedCallback(){
        super.connectedCallback();
        this.props.initialize();
    }
    mapDispatchToProps(){
        return {initialize : todo.initialize};
    }
}