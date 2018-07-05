import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
      super();
      this.state = {
        todos: [],
        input: '',
        editInput:'',
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
     this.setState({todos})
   }

   handleEdit = (i) => {
     const todos = this.state.todos;
     console.log(this.state.input2, todos[i].name);
    todos[i].name = this.state.input2;
    this.setState({todos})
   }

   handleEditInput = event => {
      this.setState({editInput: event.target.value})
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
            { this.state.todos.map((todo,index) => <li>
            { !todo.showEdit &&  <div>
                <input type="checkbox" onChange={() => {this.handleCompleted(index)}} checked={todo.completed} />
                <span style= {{textDecoration:todo.completed ? 'line-through' : 'none'}}>{todo.name}</span>
                <button onClick = {(e) => {this.handleShowEdit(index)}}>Edit</button>
                <button onClick={(e) => {this.handleDelte(index)}}>Delete</button>
              </div>
            }

                { todo.showEdit &&  <div>
                    <input placeholder="Enter the change .." onChange={this.handleEditInput} value={todo.name}/>
                    <button onClick={() => {this.handleEdit(index)} }>Save</button>
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
