import { render, fireEvent } from '@testing-library/react';
import ModalGeneric from './ModalGeneric';

describe('ModalGeneric', () => {
  test('muestra el mensaje y los children cuando showModal es verdadero', () => {
    const message = 'Modal Message';
    const handleClose = jest.fn();
    const { getByText } = render(
      <ModalGeneric
        message={message}
        showModal={true}
        onCloseModal={handleClose}
      >
        <div>Modal Content</div>
      </ModalGeneric>
    );

    expect(getByText('Modal Message')).toBeInTheDocument();
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  test('no muestra el mensaje y los children cuando showModal es falso', () => {
    const message = 'Modal Message';
    const handleClose = jest.fn();
    const { queryByText } = render(
      <ModalGeneric
        message={message}
        showModal={false}
        onCloseModal={handleClose}
      >
        <div>Modal Content</div>
      </ModalGeneric>
    );

    expect(queryByText('Modal Message')).not.toBeInTheDocument();
    expect(queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('no llama a onCloseModal cuando se hace clic fuera de modal si closeOnOutside es falso', () => {
    const message = 'Modal Message';
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <div data-testid="outside">
        <ModalGeneric
          message={message}
          showModal={true}
          onCloseModal={handleClose}
        >
          <div>Modal Content</div>
        </ModalGeneric>
      </div>
    );

    fireEvent.click(getByTestId('outside'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  test('llama a onCloseModal cuando se hace clic fuera de modal si closeOnOutside es verdadero', () => {
    const message = 'Modal Message';
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <div data-testid="outside">
        <ModalGeneric
          message={message}
          showModal={true}
          onCloseModal={handleClose}
        >
          <div>Modal Content</div>
        </ModalGeneric>
      </div>
    );

    fireEvent.click(getByTestId('outside'));
  });
});
