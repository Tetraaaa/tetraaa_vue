export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
export const PIANO_ROLL = new Array(88).fill(undefined).map((i, inx) => `${NOTES[inx % NOTES.length]}${Math.floor(inx / NOTES.length)}`).slice(9).concat("E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7", "C8")


export function isMidiNote(keyIndex: number) {
    //Les codes MIDI hors de cet intervalle ne correspondent pas à des notes sur le piano mais sont souvent mappés à des boutons sur le synthétiseur
    return keyIndex >= 21 && keyIndex <= 108
}

export function midiIndexToNote(keyIndex: number) {
    if (!isMidiNote(keyIndex)) return "C5"
    keyIndex -= 12
    return `${NOTES[keyIndex % NOTES.length]}${Math.floor(keyIndex / NOTES.length)}`
}