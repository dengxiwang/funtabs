export default function ShowLabelFontColor() {
  const localFontColor = localStorage.getItem('fontColor');
  return localFontColor ? localFontColor : '#ffffff';
}