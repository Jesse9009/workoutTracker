import React, { Component } from 'react';

class CreateForm extends Component {
  state = {
    exercises: [],
    title: '',
    sets: 0,
    reps: 0
  };

  componentDidMount() {
    this.setState({
      exercises: JSON.parse(localStorage.getItem('exercises')) || []
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addExercise = () => {
    let { title, sets, reps } = this.state;
    if (title.trim() && sets && reps) {
      let newExercise = {
        id: Math.random(),
        title,
        sets,
        reps
      };
      let arr = this.state.exercises || [];
      arr.push(newExercise);
      this.setState({ exercises: arr, title: '', sets: 0, reps: 0 });
    }

    if (!title.trim()) {
      this.setState({ title: '' });
    }
  };

  deleteExercise = e => {
    this.setState({
      exercises: this.state.exercises.filter(
        ex => ex.id !== +e.target.parentNode.id
      )
    });
  };

  saveState = () => {
    localStorage.setItem('exercises', JSON.stringify(this.state.exercises));
    console.log(localStorage.getItem('exercises'));
  };

  render() {
    let { exercises } = this.state;
    return (
      <div>
        <br />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.state.title}
        />
        <label htmlFor="sets">Sets</label>
        <input
          type="number"
          name="sets"
          onChange={this.handleChange}
          value={this.state.sets}
        />
        <label htmlFor="reps">Reps</label>
        <input
          type="number"
          name="reps"
          onChange={this.handleChange}
          value={this.state.reps}
        />
        <button onClick={this.addExercise}>Add Exercise</button>
        {exercises[0] ? (
          exercises.map(e => {
            return (
              <p key={Math.random()} id={e.id}>
                {e.title} - {e.sets} sets of {e.reps} reps
                <span
                  onClick={this.deleteExercise}
                  style={{
                    backgroundColor: 'red',
                    marginLeft: '50px',
                    padding: '3px 6px',
                    color: 'white',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  X
                </span>{' '}
              </p>
            );
          })
        ) : (
          <p>No exercises added</p>
        )}
        <div>
          <button onClick={this.saveState}>SAVE</button>
        </div>
      </div>
    );
  }
}

export default CreateForm;
