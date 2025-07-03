import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from './order-info';

export const OrderInfoModal: FC = () => {
  const { number } = useParams<{ number: string }>();
  return (
    <Modal onClose={() => window.history.back()} title={`#${number}`}>
      <OrderInfo />
    </Modal>
  );
};
