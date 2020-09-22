import React from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;
import { ITask } from '../../../interfaces/ITask';
import { ICourse } from '../../../interfaces/ICourse';

interface AProps {
  course: ICourse;
  activeTask: string | undefined;
  getActiveTask: (value: string) => void;
}

const ActiveTask: React.FC<AProps> = ({ course, getActiveTask }) => {
  const onSelected = (value: string) => {
    console.log(value);
    getActiveTask(value);
  };
  return (
    <>
      <Form>
        <Form.Item name="Active task" label="Active task" style={{ width: '100%' }}>
          <Select placeholder="Active task..." style={{ width: 810 }} onChange={onSelected}>
            {course.tasks.map((province) => (
              <Option key={province.taskID} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default ActiveTask;
