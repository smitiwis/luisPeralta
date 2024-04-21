import { FC, ReactNode, useEffect } from "react";
import Modal from "react-modal";

type Props = {
  message: ReactNode | string;
  children: ReactNode;
  showModal: boolean;
  onCloseModal: () => void;
  onAfterClose?: () => void;
  closeOnOutside?: boolean;
  size?: "small" | "medium" | "large";
};

const ModalGeneric: FC<Props> = ({
  message,
  children,
  showModal = false,
  onCloseModal,
  closeOnOutside = true,
  onAfterClose,
  size = "medium",
}) => {
  useEffect(() => {
    Modal.setAppElement(`#modalRoot`);
  }, []);

  return (
    <div id={"modalRoot"}>
      <Modal
        className={`modal-generic modal-generic--${size}`}
        isOpen={showModal}
        onRequestClose={closeOnOutside ? onCloseModal : undefined} // Cerrar con click fuera del modal
        onAfterClose={onAfterClose}
      >
        <h3 className="text-base mb-5 text-center font-[500]">{message}</h3>
        <div className="separator-top pt-5">{children}</div>
      </Modal>
    </div>
  );
};

export default ModalGeneric;
