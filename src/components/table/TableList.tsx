import { FC, useEffect, useState } from "react";
import { COLUMNS_LIST } from "../../constants/table-list";
import SqueletonList from "../../pages/components/SqueletonList";
import { formatDate } from "../../helpers/date";
import { Product_I } from "../../interfaces/products";

type TableListProps = {
  loading: boolean;
  data: Product_I[];
  gotoEditProduct: (id: string) => void;
  openModalDeleteProduct: (product: Product_I) => void;
};
const TableList: FC<TableListProps> = ({
  loading,
  data,
  gotoEditProduct,
  openModalDeleteProduct,
}) => {
  const [products, setProducts] = useState<Product_I[]>(data);

  const rowItem = (propiedad: string, product: Product_I, index: number) => {
    switch (propiedad) {
      case "logo":
        return (
          <img width={50} height={50} src={product.logo} alt={product.logo} />
        );

      case "name":
        return product.name;

      case "description":
        return product.description;

      case "date_release":
        return formatDate(product.date_release);

      case "date_revision":
        return formatDate(product.date_revision);

      case "actions":
      default:
        return (
          <div className="flex justify-center gap-x-2 w-[100%]">
            <button
              className="btn btn--secondary btn--small"
              onClick={() => gotoEditProduct(product.id)}
            >
              Editar
            </button>
            <button
              className="btn btn--delete btn--small"
              onClick={() => openModalDeleteProduct(product)}
            >
              Eliminar
            </button>
          </div>
        );
    }
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <>
      <table className="table-main">
        <thead className="table-main__header">
          <tr>
            {COLUMNS_LIST.map((column) => (
              <th key={column.key}>
                <div className="flex gap-2">
                  {column.name.toLocaleUpperCase()}
                  {column.icon && (
                    <img
                      width={15}
                      src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/information-icon.png"
                      alt=""
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-main__body">
          {loading ? (
            <SqueletonList />
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                {COLUMNS_LIST.map((column, ind) => (
                  <td key={column.key}>{rowItem(column.key, product, ind)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableList;
