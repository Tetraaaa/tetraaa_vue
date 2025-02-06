<script setup lang="ts">
import { Context, loaded, Sampler, setContext, start } from 'tone';


const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

navigator.requestMIDIAccess().then(midiAccess => {
    let inx = 0
    midiAccess.inputs.forEach((entry) => {
        if (inx === 0) entry.onmidimessage = onMIDIMessage;
        inx++
    });

})

setContext(new Context({ latencyHint: "playback", lookAhead: 0 }))

const sampler = new Sampler({
    urls: {
        "C5": "C5v5.webm"
    },
    release: 1,
    baseUrl: "audio/piano/",
}).toDestination()

function onMIDIMessage(event: MIDIMessageEvent) {
    if (!event.data) return
    let payload = []
    for (const character of event.data) {
        payload.push(Number(character))
    }
    onNotePlayed(payload[1], payload[2])
}

function onNotePlayed(noteIndex: number, strength: number) {
    if (strength <= 0) return
    console.log("Note jouée : ", noteIndex, " force : ", strength);
    const notePlayed = `${NOTES[noteIndex % NOTES.length]}${Math.floor(noteIndex / NOTES.length) - 1}`
    const noteHtmlContainer = document.getElementById("notePlayed")
    if (noteHtmlContainer) noteHtmlContainer.innerText = notePlayed
    sampler.triggerAttackRelease(notePlayed, 1);
}
</script>

<template>
    <div id="notePlayed"></div>
</template>

<style scoped lang="scss">
#notePlayed {
    font-size: 3rem;
}
</style>