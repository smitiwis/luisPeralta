import { COLUMNS_LIST, NUM_ROWS_SQUELETON } from "../../constants/table-list";
import Squeleton from "../../components/skeleton/TableSqueleton";

const SqueletonList = () => {
  return (
    <>
      {NUM_ROWS_SQUELETON.map((i) => (
        <tr key={i}>
          {COLUMNS_LIST.map((y) => (
            <td key={y.key}>
              <Squeleton />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SqueletonList;
