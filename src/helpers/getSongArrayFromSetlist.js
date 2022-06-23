export const getArrayOfSongsFromSetlistString = (setlistString) => {

  const setlistWithNotesRemoved = setlistString.toLowerCase().split('notes:')[0]

  const anyNonLettersExceptSpace = /[^a-zA-Z ]+/g

  const result =
    setlistWithNotesRemoved
      .replace("set 1:", "")
      .replace("set 2:", "")
      .replace("set 3:", "")
      .replace("encore:", "")
      .split(anyNonLettersExceptSpace)

  let trimmed = []
  result.forEach(song => trimmed.push(song.trim()))
  console.log(trimmed)

  const resultWithoutEmptyStrings = trimmed.filter(song => song != "")


  return resultWithoutEmptyStrings
}