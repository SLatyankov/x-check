import React, { useState } from 'react';
import { Button } from 'antd';
import { task } from '../../../db/tasks';
import { db } from '../../../firebase';

const SubmitTasks = () => {
  const [stopSubmit, setStopSubmit] = useState(true);

  const submitTasks = (e: any) => {
    e.preventDefault();
    if (stopSubmit) {
      db.collection('tasks')
        .add(task)
        .then(() => console.log('A new task has been added!', 'Success!'))
        .catch((e) => new Error(`Create user failed! ${e.message}`));
      setStopSubmit(!stopSubmit);
    }
  };

  return (
    <>
      <div>
        <Button type="primary" htmlType="button" onClick={submitTasks}>
          Submit tasks
        </Button>
      </div>
    </>
  );
};

export default SubmitTasks;