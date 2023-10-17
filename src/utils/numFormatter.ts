export default function FormatNumber(num: number) {
  return new Intl.NumberFormat("id-ID").format(num);
}
