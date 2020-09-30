import React, { useState } from 'react';
import { Select, Input, Table, Tag } from 'antd';
import { ITask, TypeTask } from '../../../interfaces/ITask';
import styles from './index.module.css';
import { CheckState, ICheсk, IStudent, IWorkDone } from '../../../interfaces/IWorkDone';

interface ISelectTask {
  name: string;
  id: string;
}
interface PropsSidebar {
  taskList: ISelectTask[];
  isDeadline: boolean;
  checkingTasks: ICheсk[];
  activeStudent: IStudent;
  students: IStudent[];
  getTask: (task: string) => void;
  selectStudent: (reviewer: IStudent) => void;
}

const SidebarReview: React.FC<PropsSidebar> = ({
  getTask,
  taskList,
  checkingTasks,
  activeStudent,
  isDeadline,
  students,
  selectStudent,
}) => {
  const { Option } = Select;

  const handleClick = (value: string) => {
    getTask(value);
  };

  const onClickStudent = (studentID: string) => {
    const result = students.filter((item) => item.id === studentID);
    if (result.length !== 0) {
      selectStudent(result[0]);
    } else {
      selectStudent({} as IStudent);
    }
  };

  let sideBarJSX: JSX.Element = <></>;
  let colorTag = 'geekblue';
  let itemStatus = '';
  if (isDeadline && checkingTasks.length !== 0 && students.length !== 0) {
    const data = students.map((item, index) => {
      const stateItem = checkingTasks.filter((itemChecks) => itemChecks.checkerID === item.id);
      if (stateItem.length !== 0) {
        switch (stateItem[0].state) {
          case CheckState.NotVerified:
            colorTag = 'geekblue';
            itemStatus = 'Not Verified';
            break;
          case CheckState.AuditorDraft:
            colorTag = 'geekblue';
            itemStatus = 'Auditor Draft';
            break;
          case CheckState.Verified:
            colorTag = 'green';
            itemStatus = 'Verified';
            break;
          case CheckState.Dispute:
            colorTag = 'red';
            itemStatus = 'Dispute';
            break;
          case CheckState.DisputeClosed:
            colorTag = 'gold';
            itemStatus = 'Dispute closed';
            break;
          default:
            colorTag = 'blue';
            itemStatus = 'Auditor Draft';
        }
      } else {
        colorTag = 'geekblue';
        itemStatus = 'Auditor Draft';
      }
      return {
        key: item.id,
        reviewer: item.name,
        status: itemStatus,
      };
    });

    const addLink = (text: string) => {
      return <a>{text}</a>;
    };

    const addTag = (text: string) => {
      return (
        <Tag color={colorTag} key={text}>
          {text}
        </Tag>
      );
    };
    const columns = [
      {
        title: 'Reviewer',
        dataIndex: 'reviewer',
        key: 'reviewer',
        render: addLink,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: addTag,
      },
    ];
    sideBarJSX = (
      <div>
        {
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  onClickStudent(record.key);
                },
              };
            }}
          />
        }
      </div>
    );
  } else {
    sideBarJSX = <></>;
  }

  return (
    <div className={styles.sideBar}>
      <div className={styles.mb5}>
        <Select placeholder="Select the task" style={{ width: '100%' }} onChange={handleClick}>
          {taskList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
      {sideBarJSX}
    </div>
  );
};

export default SidebarReview;
