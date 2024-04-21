import React from "react";
import { COLUMNS_LIST, NUM_ROWS_SQUELETON } from "../../constants/table-list";
import Squeleton from "../../components/skeleton/TableSqueleton";

const SqueletonList = () => {
  return (
    <>
      {NUM_ROWS_SQUELETON.map((i) => {
        return (
          <tr key={i}>
            {COLUMNS_LIST.map((y) => {
              return (
                <td
                  key={y}
                  className="px-4 py-2 border border-x-[transparent] border-y-gray-400"
                >
                  <Squeleton  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default SqueletonList;
