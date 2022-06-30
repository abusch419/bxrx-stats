export const getArrayOfSongsFromSetlistString = (setlistString) => {

  // lower case the setlist 
  const lowerCasedSetlist = setlistString.toLowerCase()
  // remove everything starting with 'notes"'
  const setlistWithNotesRemoved = lowerCasedSetlist.split('notes:')[0]
  // remove anything between square brackets including the brackets
  const anythingBetweenSquareBrackets = / *\[? *.(?!((.*\[)))*\] */g
  const setlistWithNoNotesOrNotesMarkers = setlistWithNotesRemoved.replaceAll(anythingBetweenSquareBrackets, '')
  // remove newlines
  const newlines = /\n\s*/g
  const setlistWithNoNotesOrNoteMarkersOrNewlines = setlistWithNoNotesOrNotesMarkers.replaceAll(newlines, '')


  // remove set markers and split on anyCommasOrAngleBracketsOrArrows
  const anyCommasOrAngleBracketsOrArrows = /[>,]|->+/g
  const result =
    setlistWithNoNotesOrNoteMarkersOrNewlines
      .replace("soundcheck:", ",")
      .replace("set 1:", ",")
      .replace("set 2:", ",")
      .replace("set 3:", ",")
      .replace("encore:", ",")
      .split(anyCommasOrAngleBracketsOrArrows)

  let trimmed = []
  result.forEach(song => trimmed.push(song.trim()))
  console.log(trimmed)

  const resultWithoutEmptyStrings = trimmed.filter(song => song != "")


  return resultWithoutEmptyStrings
}