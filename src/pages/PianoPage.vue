<script setup lang="ts">
import { isMidiNote, midiIndexToNote, NOTES, PIANO_ROLL } from '@/tools/midi';
import { Context, loaded, now, Sampler, setContext, start } from 'tone';
import { onMounted, onUnmounted, ref, watch } from 'vue';

let sampler: Sampler
const midiAccess = ref<MIDIAccess>();
const lastPlayedKey = ref<string>();
const heldNotes = ref<string[]>([]);


onMounted(() => {
    navigator.requestMIDIAccess().then(access => {
        midiAccess.value = access
        let inx = 0
        access.inputs.forEach((entry) => {
            if (inx === 0) entry.addEventListener("midimessage", onMIDIMessage)
            inx++
        });
    })

    setContext(new Context({ latencyHint: "playback", lookAhead: 0 }))

    sampler = new Sampler({
        urls: {
            "A0": "A0.webm",
            "A1": "A1.webm",
            "A2": "A2.webm",
            "A3": "A3.webm",
            "A4": "A4.webm",
            "A5": "A5.webm",
            "A6": "A6.webm",
            "A7": "A7.webm",
            "C1": "C1.webm",
            "C2": "C2.webm",
            "C3": "C3.webm",
            "C4": "C4.webm",
            "C5": "C5.webm",
            "C6": "C6.webm",
            "C7": "C7.webm",
            "C8": "C8.webm",
            "D#1": "Ds1.webm",
            "D#2": "Ds2.webm",
            "D#3": "Ds3.webm",
            "D#4": "Ds4.webm",
            "D#5": "Ds5.webm",
            "D#6": "Ds6.webm",
            "D#7": "Ds7.webm",
            "F#1": "Fs1.webm",
            "F#2": "Fs2.webm",
            "F#3": "Fs3.webm",
            "F#4": "Fs4.webm",
            "F#5": "Fs5.webm",
            "F#6": "Fs6.webm",
            "F#7": "Fs7.webm",
        },
        baseUrl: "audio/piano/",
        release: 0.75,
        onload: () => console.log("loaded")


    }).toDestination()
})

onUnmounted(() => {
    midiAccess.value?.inputs.forEach(entry => entry.removeEventListener("midimessage", onMIDIMessage))
})

function onMIDIMessage(event: MIDIMessageEvent) {
    if (!event.data) return
    let payload = []
    for (const character of event.data) {
        payload.push(Number(character))
    }
    onNotePlayed(payload[1], payload[2])
}

function onNotePlayed(noteIndex: number, velocity: number) {
    if (!isMidiNote(noteIndex)) return

    const notePlayed = midiIndexToNote(noteIndex)
    if (velocity <= 0) {
        releaseNote(notePlayed)
        return
    }
    const velocityPlayed = velocity / 127
    attackNote(notePlayed, velocityPlayed)
}
function attackNote(note: string, velocity: number) {
    lastPlayedKey.value = note
    heldNotes.value.push(note)
    sampler.triggerAttack(note, now(), velocity);
}

function releaseNote(note: string) {
    heldNotes.value = heldNotes.value.filter(n => n !== note)
    sampler.triggerRelease(note, now());
}

</script>

<template>
    <div class="container">
        <div id="notePlayed" style="font-weight: bold;">{{ lastPlayedKey }}</div>
        <div class="piano">
            <div v-for="note, inx in PIANO_ROLL.filter(n => !n.includes('#'))"
                :style="{ zIndex: 100 - inx, background: heldNotes.includes(note) ? `linear-gradient(45deg, ivory, #7d65c5)` : '' }"
                @mousedown="attackNote(note,
                    0.75)" @mouseup="releaseNote(note)" class="note">
                <div :style="{ background: heldNotes.includes(note[0] + '#' + note[1]) ? `linear-gradient(45deg, black, #7d65c5)` : '' }"
                    @mousedown="(e) => {
                        e.stopPropagation(); attackNote(note[0] + '#' + note[1],
                            0.75)
                    }" @mouseup="releaseNote(note[0] + '#' + note[1])" class="note black"
                    v-if="!note.includes('E') && !note.includes('B')">
                </div>
                <div class="note-highlight" v-if="heldNotes.includes(note)"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    background: rgb(26, 26, 27);
    background: linear-gradient(rgb(41, 41, 41) 0%, rgb(24, 24, 41) 75%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: white;
}

.piano {
    display: flex;
    gap: 2px;
    width: 100vw;
    justify-content: center;
}

.note {
    height: 20vh;
    min-height: 1rem;
    background-color: ivory;
    flex: 1;
    min-width: 30px;
    position: relative;
    color: black;
    font-size: 9px;


    &.black {
        background-color: black;
        top: 0;
        left: 77%;
        height: 12vh;
        width: 50%;
        color: white;
        min-width: unset;
    }
}

.note-highlight {
    position: absolute;
    top: 0;
    transform-origin: bottom;
    background: red;
    transform: scaleY(2);
    height: 10px;
}

#notePlayed {
    font-size: 3rem;
}
</style>