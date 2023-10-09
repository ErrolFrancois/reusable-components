export default function getDate() {
  const today = new Date();
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  return formattedDate;
}
