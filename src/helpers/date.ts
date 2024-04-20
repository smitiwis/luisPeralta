export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();

  // Formatear la fecha en el formato deseado (DD-MM-YYYY)
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return formattedDate;
};

export const clearWord = (palabra: string):string => {
  // Reemplazar letras acentuadas con sus equivalentes sin acento
  const limpio = palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return limpio;
};
