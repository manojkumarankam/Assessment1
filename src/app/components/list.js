import React from "react";
import { TextField, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import  {history}  from "../history/history";
import axios from "axios";
import {CommonConstants} from "../constants/common.constants";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: {
        title: ""
      }
    };
  }

  onHandleChange = event => {
    debugger;
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
    this.getAllTasks().then(res => {
      debugger;
      this.setState({ tasks: res });
    });
  }
  getAllTasks() {
    let Task_Url = CommonConstants.API_URL;
    return axios({
      method: "get",
      url: Task_Url
    }).then(function(response) {
      if (response.status === 200) {
        return response.data;
      }
      console.log(response);
    });
  }

  deleteTask(id) {
    debugger;
    this.deleteTaskById(id).then(res => {
      this.setState({ tasks: res });
    });
  }
  deleteTaskById(id) {
    let Task_Url = CommonConstants.API_URL;
    let Req_Url = `${Task_Url}/${id}`;
    return axios({
      method: "delete",
      url: Req_Url
    }).then(function(response) {
      debugger;
      if (response.status === 200) {
        return response.data;
      }
    });
  }

  complateTask(id) {
    let Task_Url =CommonConstants.API_URL;
    let Req_Url = `${Task_Url}/${id}`;
    axios({
      method: "Put",
      url: Req_Url
    }).then(function(response) {
      debugger;
      if (response.status === 200) {
        window.location.reload();
      }
    });
  }

  saveTask = event => {
    this.saveData().then(res => {
      this.setState({
        task: res
      });
    });
  };
  saveData() {
    const { task } = this.state;
    let model = { title: task.title };
    let Task_Url = CommonConstants.API_URL;

    return axios({
      method: "post",
      url: Task_Url,
      data: model
    }).then(function(response) {
      debugger;
      if (response.status === 200) {
        return response.data;
      }
    });
  }

  render() {
    const { task } = this.state;
    const { tasks } = this.state;
    return (
      <div style={dvBorder}>
        <b>TO-DO:</b>
        <br />
        <TextField
          label="Title*"
          placeholder="Title*"
          name="title"
          value={task.title}
          onChange={this.onHandleChange}
        />
        <Button variant="contained" color="primary" onClick={this.saveTask}>
          Add new To:do
        </Button>
        <br />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title </TableCell>
              <TableCell>Description </TableCell>
              <TableCell> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!tasks && (
              <TableRow>
                <TableCell />
              </TableRow>
            )}
            {tasks &&
              tasks.map((o, i) => (
                <TableRow key={i}>
                  <TableCell
                    className={o.completed === true ? "strike" : "no-style"}
                  >
                    <a
                      onClick={() => {
                        history.push("/add-edit/" + o.id);
                      }}
                    >
                      {o.title}{" "}
                    </a>
                  </TableCell>
                  <TableCell>{o.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="default"
                      disabled={o.completed}
                      onClick={() => {
                        this.deleteTask(o.id);
                      }}
                    >
                      X
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={o.completed}
                      onClick={() => {
                        this.complateTask(o.id);
                      }}
                    >
                      Complete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const dvBorder = {
  border: "1px solid lightgray",
  marginLeft: "60px",
  marginRight: "60px",
  marginTop: "5px"
};

export default List;
