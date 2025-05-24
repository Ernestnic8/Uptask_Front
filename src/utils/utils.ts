export function formatDate (isoString: string) : string {
  const date = new Date(isoString);
  const options = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return options.format(date)
}