export default function cursorControl(edit) {
  if (edit === '') {
    return 'move'
  } else {
    return 'pointer'
  }
}
