import React, { Component } from 'react';
import './Todo.css';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          text: "Hello World",
          show: true,
          isEditable: false
        },
        {
          id: 2,
          text: "Nature is everything",
          show: true,
          isEditable: false
        }
      ],
      newText: ''
    };
    this.getValue = this.getValue.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.saveTodos=this.saveTodos.bind(this);
  }

  getValue(e) {
    this.setState({
      newText: e.target.value
    });
  }

  addTodo() {
    const newTodo = {
      id: Date.now(),
      text: this.state.newText,
      isEditable: false
    };
    if (this.state.newText === '') {
      alert("Enter Something in input field");
    } else {
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo],
        newText: ''
      }));
    }
  }

  deleteTodo(id) {
    const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({
      todos: updatedTodos
    });
  }

  toggleEdit(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isEditable: !todo.isEditable };
      }else{
        return todo;
      }
      
    });
    this.setState({
      todos: updatedTodos
    });
  }

  handleEdit(id, newText) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText, isEditable: true };
      }else{
        return todo;

      }
    });
    this.setState({
      todos: updatedTodos
    });
  }
saveTodos(id){
    const saveTodos = this.state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isEditable: false };
        }
        return todo;
      });
      this.setState({
        todos: saveTodos
      });
}
  render() {
    return (
      <div className='todo-container'>
        <form className='todo-form'>
        <h2 className='text-center'>React Todo</h2>
          <div class="input-group mb-3">
        
  <input type="text" class="form-control"  onChange={this.getValue} placeholder='Enter something'  aria-label="Todo-Items" aria-describedby="Add-Items"/>
  <button type='button' onClick={this.addTodo} className="todo-button">Add</button>
</div>
        </form>
        <ul className='todo-list'>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              {todo.isEditable ? (
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={e => this.handleEdit(todo.id, e.target.value)}
                  onBlur={() => this.handleEdit(todo.id, todo.text)}
                  className='form-control'
                />
                <button type='button' className="todo-button"onClick={()=>this.saveTodos(todo.id)}>Save</button>
              </>
              ) : (         
    <div className='todo-list-container'>
    <span className='todo-text'>{todo.text}</span>
       <span onClick={() => this.toggleEdit(todo.id)} className='buttons'>&#x270E;</span>
              <span onClick={() => this.deleteTodo(todo.id)}className='buttons'>Delete</span>
    </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
