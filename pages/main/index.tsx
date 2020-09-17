import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Typography } from 'antd';

interface PropsMainPage {
  changeAuthorization: () => void;
}

const MainPages: React.FC<PropsMainPage> = ({ changeAuthorization }) => {
  const { Title } = Typography;

  return (
    <>
      <MainLayout title={`main: choice a role`} changeAuthorization={changeAuthorization}>
        <section className={'box-roles'}>
          <Title level={1}>Choice a role</Title>
        </section>
      </MainLayout>
    </>
  );
};

export default MainPages;
