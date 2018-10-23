import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import  {history}  from "../history/history";
import axios from "axios";

class AddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        description: "",
        completed: false,
        id: 0
      }
    };
  }

  onHandleChange = event => {
    const { name, value } = event.target;
    const { task } = this.state;
    this.setState({
      task: {
        ...task,
        [name]: value
      }
    });
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getTaskById().then(res => {
        this.setState({ task: res[0] });
      });
    }
  }
  getTaskById() {
    let id = this.props.match.params.id;
    let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
    return axios({
      method: "Get",
      url: Task_Url
    }).then(function(response) {
      if (response.status === 200) {
        return response.data.filter(function(item) {
          return parseInt(item.id) === parseInt(id);
        });
      }
      console.log(response);
    });
  }

  deleteTask(id) {
    this.deleteTaskById(id).then(res => {
      this.setState({ tasks: res });
    });
    history.push("/list");
  }
  deleteTaskById(id) {
    debugger;
    let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
    let Req_Url = `${Task_Url}/${id}`;
    return axios({
      method: "Delete",
      url: Req_Url
    }).then(function(response) {
      debugger;
      if (response.status === 200) {
        return response.data;
      }
    });
  }

  saveTask = event => {
    const { task } = this.state;
    let model = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      id: parseInt(this.props.match.params.id, 10)
    };
    let Task_Url = "https://practiceapi.devmountain.com/api/tasks";
    let Req_Url = `${Task_Url}/${parseInt(this.props.match.params.id, 10)}`;

    axios({
      method: "Patch",
      url: Req_Url,
      data: model
    }).then(function(response) {
      debugger;
      console.log(response);
      history.push("/list");
    });
  };

  render() {
    const { task } = this.state;
    return (
      <div>
        <Link to="/list">
          <b>Back to Tasks</b>
        </Link>{" "}
        <br />
        <TextField
          label="Title*"
          placeholder="Title*"
          name="title"
          value={task.title}
          onChange={this.onHandleChange}
        />
        <br />
        <TextField
          label="Description"
          placeholder="Description"
          name="description"
          value={task.description}
          onChange={this.onHandleChange}
        />
        <br />
        <div style={marTop}>
          <Button variant="contained" color="primary" onClick={this.saveTask}>
            Save
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              history.push("/list");
            }}
          >
            Cancel
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.deleteTask(this.props.match.params.id);
            }}
          >
            Delete
          </Button>
          &nbsp;
        </div>
      </div>
    );
  }
}

const marTop = {
  marginTop: "5px"
};

export default AddEdit;
