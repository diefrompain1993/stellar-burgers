import { FC } from 'react';
import { Modal } from '@components';
import { OrderInfo } from '../order-info/order-info';
import { useSelector } from '../../services/store';

export const OrderInfoModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const orderData = useSelector((state) => state.orders.currentOrder);
  const title = orderData ? `#${String(orderData.number).padStart(6, '0')}` : '';

  return (
    <Modal onClose={onClose} title={title}>
      <OrderInfo />
    </Modal>
  );
};
