import { FC, ReactNode, useEffect } from "react";
import Modal from "react-modal";

type Props = {
  message: string;
  children: ReactNode;
  showModal: boolean;
  onCloseModal: () => void;
  onAfterClose?: () => void;
  closeOnOutside?: boolean;
};

const ModalGeneric: FC<Props> = ({
  message,
  children,
  showModal = false,
  onCloseModal,
  closeOnOutside = true,
  onAfterClose,
}) => {
  useEffect(() => {
    Modal.setAppElement(`#modalRoot`);
  }, []);

  return (
    <div id={"modalRoot"}>
      <Modal
        className="modal-generic"
        isOpen={showModal}
        onRequestClose={closeOnOutside ? onCloseModal : undefined} // Cerrar con click fuera del modal
        onAfterClose={onAfterClose}
      >
        <h3>{message}</h3>
        {children}
      </Modal>
    </div>
  );
};

export default ModalGeneric;
