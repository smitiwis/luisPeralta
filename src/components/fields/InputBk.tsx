import { FC } from "react";
import Squeleton from "../skeleton/TableSqueleton";

type Props = {
  register: any;
  error: string | undefined;
  loading: boolean;
  label: string;
  type: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

const InputBk: FC<Props> = ({
  label,
  loading,
  error,
  register,
  disabled,
  readOnly,
  type,
  id = "",
}) => {
  return (
    <label className="label-field mb-3">
      <span>{label}</span>
      {loading ? (
        <input
          className={`input-field ${error ? "input-field--error" : ""}`}
          {...register}
          id={id}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
        />
      ) : (
        <Squeleton heigth={40} />
      )}
      {error && <p className="text text--error">{error}</p>}
    </label>
  );
};

export default InputBk;
