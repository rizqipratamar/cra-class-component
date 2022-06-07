import React from "react";
import "./App.css";
import {
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, PageHeader, Tooltip, Col, Row } from "antd";

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
            {this.state.taskList?.map((task) => (
              <Col span={4} key={task?.id}>
                <Card
                  style={{
                    width: 300,
                    marginTop: 16,
                  }}
                  title={task.name}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
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
