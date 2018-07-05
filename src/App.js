import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
      super();
      this.state = {
        todos: [],
        input: '',
        editInputs: {},
        showInput : false
      }
    }

   handleInputChange = event => {
     this.setState({input: event.target.value})
   }

   handleAdd = () => {
     const todos = this.state.todos
     todos.push({name: this.state.input, date: new Date(), completed: false, showEdit: false})
     this.setState({todos, input:'', showInput: false})
   }

   handleCompleted =  i => {
    const todos = this.state.todos
    todos[i].completed = !todos[i].completed
    this.setState({todos})
   }

   handleDelte = (i) => {
     const todos = this.state.todos.slice();
     todos.splice(i,1);
     this.setState({todos})
   }

   handleShow = (e) => {
      this.setState({showInput : !this.state.showInput})

   }

   handleShowEdit = (i) => {
     const todos = this.state.todos
     todos[i].showEdit = !todos[i].showEdit
     const editInputs = this.state.editInputs
     editInputs[i] = todos[i].name
     this.setState({todos, editInputs})
   }

   handleEdit = (i) => {
     const todos = this.state.todos;
    todos[i].name = this.state.editInputs[i]
    this.setState({todos})
    this.handleShowEdit(i)
   }

   handleEditInput = (value, index) => {
    const editInputs = this.state.editInputs
    editInputs[index] = value
      this.setState({editInputs})
   }


  render() {
    return (
      <div className="App">
      <h1>Todo</h1>
          <div className="input">

        {this.state.showInput &&  <div>
            <input onChange={this.handleInputChange} value={this.state.input} placeholder="Enter what you want to do here ..."/>
            <button onClick={this.handleAdd}> Add </button>
            </div>
          }
            {!this.state.showInput && <button onClick={() => {this.handleShow()}}>Add todo</button>}
          </div>

            <ul>
            { this.state.todos.map((todo,index) => <li key={index}>
            { !todo.showEdit &&  <div>
                <input type="checkbox" onChange={() => {this.handleCompleted(index)}} checked={todo.completed} />
                <span style= {{textDecoration:todo.completed ? 'line-through' : 'none'}}>{todo.name}</span>
                <button onClick = {(e) => {this.handleShowEdit(index)}}>Edit</button>
                <button onClick={(e) => {this.handleDelte(index)}}>Delete</button>
              </div>
            }

                { todo.showEdit &&  <div>
                    <input placeholder="Enter the change .." onChange={(e) => this.handleEditInput(e.target.value, index)} value={this.state.editInputs[index]}/>
                    <button onClick={() => {this.handleEdit(index)} }>Save</button>
                    <button onClick={() => {this.handleShowEdit(index)} }>Cancel</button>
               </div>
             }
              </li>)
            }
            </ul>


      </div>
    );
  }
}

export default App;
