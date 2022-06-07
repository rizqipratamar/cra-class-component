import React from "react";
import "./App.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, PageHeader, Tooltip, Col, Row, Modal } from "antd";

const initialState = {
  date: new Date(),
  title: "To Do List",
  subtitle: "A simple to do list with react class component",
  taskList: [
    {
      id: 1,
      name: "Task 1",
      desc: "Task 1 description",
      status: true,
    },
  ],
  selectedTask: null,
};

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu",
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu",
  },
];

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  addTask = () => {
    // add task
    const { taskList } = this.state;
    const newTask = {
      id: taskList.length + 1,
      name: "Task " + (taskList.length + 1),
      desc: "Task " + (taskList.length + 1) + " description",
      status: false,
    };
    this.setState({
      taskList: [...taskList, newTask],
    });
  };

  selectTask = (task) => {
    this.setState({
      selectedTask: task,
    }); // set selected task
  };

  updateTask = () => {
    // update task
    const { taskList, selectedTask } = this.state;
    const newTaskList = taskList.map((task) => {
      if (task.id === selectedTask.id) {
        return selectedTask;
      }
      return task;
    });
    this.setState({
      taskList: newTaskList,
      selectedTask: null,
    });
  };

  deleteTask = (selectedTask) => {
    // delete task
    const { taskList } = this.state;
    const newTaskList = taskList.filter((task) => task.id !== selectedTask.id);
    this.setState({
      taskList: newTaskList,
      selectedTask: null,
    });
  };

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title={this.state.title}
          breadcrumb={{
            routes,
          }}
          subTitle={this.state.subtitle}
        />

        <Modal
          visible={this.state.selectedTask ? true : false}
          onOk={() => {
            this.updateTask();
          }}
          onCancel={() => this.selectTask(null)}
        >
          <Row>
            <Col span={12}> Name </Col>{" "}
            <Col span={12}>
              <input
                value={this.state.selectedTask?.name}
                onChange={(e) =>
                  this.setState({
                    selectedTask: {
                      ...this.state.selectedTask,
                      name: e.target.value,
                    },
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}> Description </Col>{" "}
            <Col span={12}>
              <textarea
                value={this.state.selectedTask?.desc}
                onChange={(e) =>
                  this.setState({
                    selectedTask: {
                      ...this.state.selectedTask,
                      desc: e.target.value,
                    },
                  })
                }
              />
            </Col>
          </Row>
        </Modal>

        <Card>
          <Tooltip title="Add Task">
            <Button
              type="dashed"
              shape="square"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => this.addTask()}
            >
              Add Task{" "}
            </Button>
          </Tooltip>
          <span style={{ marginLeft: 20 }}>
            Jumlah Task {this.state.taskList.length}
          </span>

          <Row style={{ marginTop: 20 }}>
            {this.state.taskList?.map((task, index) => (
              <Col span={4} key={task?.id}>
                <Card
                  style={{
                    width: 300,
                    marginTop: 16,
                  }}
                  title={task.name}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => this.selectTask(task)}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => this.deleteTask(task)}
                    />,
                  ]}
                >
                  {task.desc}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </>
    );
  }
}

export default Welcome;
