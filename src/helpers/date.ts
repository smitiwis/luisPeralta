export const formatDate = (dateString: string): string => {
  // Crear un objeto Date a partir de la cadena de fecha
  const date = new Date(dateString);

  // Obtener los componentes de la fecha
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses comienzan desde 0
  const year = date.getFullYear();

  // Formatear la fecha en el formato deseado (DD-MM-YYYY)
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return formattedDate;
};
