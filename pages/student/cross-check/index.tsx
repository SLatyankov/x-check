import React from 'react';
import MainLayout from '../../../components/MainLayout';
import { Row, Col } from 'antd';
import Sidebar from '../../../components/student/cross-check/Sidebar';
import CheckTask from '../../..//components/student/check-task';
import { checkingTask } from '../../../components/student/test-task/test-work-done';
import { testTask } from '../../../components/student/test-task/test-task';
import { ICourse } from '../../../interfaces/ICourse';

interface PropsStudent {
  changeAuthorization: () => void;
}

const dataCourse: ICourse = {
  id: 123,
  name: 'course1',
  tasks: [
    {
      taskID: 123,
      name: 'task1',
      taskStage: 'stage',
      deadline: new Date(0),
      start: new Date(),
    },
    {
      taskID: 567,
      name: 'task2',
      taskStage: 'stage',
      deadline: new Date(2021, 0, 1),
      start: new Date(),
    },
    {
      taskID: 438,
      name: 'task3',
      taskStage: 'stage',
      deadline: new Date(0),
      start: new Date(),
    },
  ],
};

const CrossCheckPage: React.FC<PropsStudent> = ({ changeAuthorization }) => {
  const tasksData = dataCourse.tasks;
  const taskList = tasksData.map((el) => el.name);

  const [task, setTask] = React.useState('');
  const [isDeadline, setIsDeadline] = React.useState(false);

  const selectTask = (task: string) => {
    setTask(task);

    const selectTaskDeadline = tasksData
      .filter((el) => el.name === task)
      .map((el) => el.deadline)[0];

    const date = new Date();

    if (selectTaskDeadline.getTime() < date.getTime()) {
      setIsDeadline(true);
    } else {
      setIsDeadline(false);
    }
  };

  return (
    <>
      <MainLayout title="Student" changeAuthorization={changeAuthorization}>
        <Row gutter={16}>
          <Col span={5}>
            <Sidebar getTask={selectTask} taskList={taskList} isDeadline={isDeadline} />
          </Col>
          <Col span={18}>
            <CheckTask
              task={testTask}
              checkingTask={checkingTask.cheсks[0]}
              reviewer={checkingTask.checkers[0]}
            />
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default CrossCheckPage;