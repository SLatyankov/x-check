import { message } from 'antd';
import { IWorkDone } from '../interfaces/IWorkDone';
import { updateObjectField } from './updateFirebase';

export const distribute = (array: IWorkDone[], task: string | undefined): any => {
  const result = array.filter((e) => e.taskID === task);
  const objStudentsArray = result.map((e) => {
    return e.student;
  });
  if (result.length) {
    result.forEach((element, i: number) => {
      if (element.reviewers.length === 0) {
        if (result.length - 1 === i) {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [...element.reviewers, ...objStudentsArray.slice(0, 1)],
          });
          return (element.reviewers = [...element.reviewers, ...objStudentsArray.slice(0, 1)]);
        } else {
          updateObjectField('completed_tasks', element.id, {
            reviewers: [...element.reviewers, ...objStudentsArray.slice(i + 1, i + 2)],
          });
          return (element.reviewers = [
            ...element.reviewers,
            ...objStudentsArray.slice(i + 1, i + 2),
          ]);
        }
      } else {
        message.success('there is already a reviewer');
      }
    });
  } else {
    message.success('there must be more than 4 works');
  }

  console.log(array);
};
