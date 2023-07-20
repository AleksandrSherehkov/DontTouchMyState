import { Header } from 'components/Header/Header';
import { Modal } from 'components/Modal/Modal';
import { ModalAddTransaction } from 'components/ModalAddTransaction/ModalAddTransaction';
import { RoundButton } from 'components/RoundButton/RoundButton';
import { useSelector } from 'react-redux';
import { selectIsModalAddTransactionOpen } from 'redux/global/globalSelectors';

const DashboardPage = () => {
  const isModalAddOpen = useSelector(selectIsModalAddTransactionOpen);
  return (
    <>
      <Header />
      {isModalAddOpen && (
        <Modal>
          <ModalAddTransaction />
        </Modal>
      )}
      <RoundButton />
    </>
  );
};

export default DashboardPage;
