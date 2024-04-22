import React from 'react';
import { render } from '@testing-library/react';
import InputBk from './InputBk';

describe('InputBk', () => {
  test('renderiza correctamente cuando está cargando', () => {
    const { getByText, getByLabelText } = render(
      <InputBk
        label="Nombre"
        loading={true}
        error=""
        register={() => ({ ref: null })}
        type="text"
      />
    );

    expect(getByText('Nombre')).toBeInTheDocument();
    expect(getByLabelText('Nombre')).toBeInTheDocument();
  });

  test('renderiza correctamente cuando no está cargando', () => {
    const { getByText, queryByLabelText } = render(
      <InputBk
        label="Nombre"
        loading={false}
        error=""
        register={() => ({ ref: null })}
        type="text"
      />
    );

    expect(getByText('Nombre')).toBeInTheDocument();
    expect(queryByLabelText('Nombre')).not.toBeInTheDocument();
  });

  test('renderiza un mensaje de error cuando se proporciona un error', () => {
    const { getByText } = render(
      <InputBk
        label="Nombre"
        loading={false}
        error="Campo requerido"
        register={() => ({ ref: null })}
        type="text"
      />
    );

    expect(getByText('Campo requerido')).toBeInTheDocument();
  });

});
