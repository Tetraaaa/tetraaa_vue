<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';
import PianoLoadingModal from '@/components/PianoPage/PianoLoadingModal.vue';
import PianoSettingsModal from '@/components/PianoPage/PianoSettingsModal.vue';
import { isMidiNote, midiIndexToNote, PIANO_ROLL, type Note } from '@/tools/midi';
import { Context, now, PolySynth, Sampler, setContext, start, Synth, type SynthOptions } from 'tone';
import { onMounted, onUnmounted, ref, watch } from 'vue';

let main: Sampler | PolySynth;
let instruments: {
    pianoSampler: Sampler;
    synth: PolySynth<Synth<SynthOptions>>;
    duckSampler: Sampler;
};
const midiAccess = ref<MIDIAccess>();
const isLoaded = ref(false);
const loadingModalOpen = ref(true);
const settingsModalOpen = ref(false);
const lastPlayedNote = ref<Note>();
const heldNotes = ref<string[]>([]);

//Piano settings
const instrumentPlayed = ref<"Piano" | "Synth" | "Duck">('Piano');
const attack = ref(0);
const sustain = ref(0);
const release = ref(0.8);
const isEnglishNotation = ref(false);

onMounted(() => {
    navigator.requestMIDIAccess().then(access => {
        midiAccess.value = access
        let inx = 0
        access.inputs.forEach((entry) => {
            if (inx === 0) entry.addEventListener("midimessage", onMIDIMessage)
            inx++
        });
    })

    const toneJsContext = new Context({ latencyHint: "playback", lookAhead: 0 })
    setContext(toneJsContext)

    instruments = loadInstruments()
    main = instruments.pianoSampler.toDestination()
})

onUnmounted(() => {
    midiAccess.value?.inputs.forEach(entry => entry.removeEventListener("midimessage", onMIDIMessage))
})

watch(attack, (newAttack) => {
    if ((main as Sampler).attack) (main as Sampler).attack = newAttack
})

watch(release, (newRelease) => {
    if ((main as Sampler).release) (main as Sampler).release = newRelease
})

watch(instrumentPlayed, (newInstrument) => {
    if (newInstrument === 'Synth') {
        main = instruments.synth
    }
    else if (newInstrument === "Duck") {
        main = instruments.duckSampler
    }
    else {
        main = instruments.pianoSampler
    }
    main.toDestination()
})

function onMIDIMessage(event: MIDIMessageEvent) {
    if (!event.data) return
    let payload = []
    for (const character of event.data) {
        payload.push(Number(character))
    }
    if (isMidiNote(payload[1])) onNotePlayed(midiIndexToNote(payload[1]), payload[2])
}

function onNotePlayed(note: Note, velocity: number) {
    isMidiNote
    if (velocity <= 0) {
        releaseNote(note)
        return
    }
    const velocityPlayed = velocity / 127
    attackNote(note, velocityPlayed)
}

function attackNote(note: Note, velocity: number) {
    heldNotes.value.push(note.englishNotation)
    lastPlayedNote.value = note
    main.triggerAttack(note.englishNotation, now(), velocity);
}

function releaseNote(note: Note) {
    heldNotes.value = heldNotes.value.filter(n => n !== note.englishNotation)
    main.triggerRelease(note.englishNotation, now() + sustain.value);
}

function loadInstruments() {
    const pianoSampler = new Sampler({
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
        attack: 0,
        release: 0.8,
        onload: () => isLoaded.value = true,
    })
    const synth = new PolySynth({ volume: -10 })
    const duckSampler = new Sampler({
        urls: {
            "C#4": "quack_Cs4.webm",
        },
        baseUrl: "audio/piano/",
        attack: 0,
        release: 0.8,
    })
    return { pianoSampler, synth, duckSampler }
}

</script>

<template>
    <BackButton />
    <div class="settings" @click="settingsModalOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
            width="24px" fill="#5f6368">
            <rect fill="none" height="24" width="24" />
            <path
                d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z" />
        </svg>
    </div>
    <div class="container">
        <div v-if="lastPlayedNote !== undefined" id="notePlayed" style="font-weight: bold;">{{
            isEnglishNotation ? lastPlayedNote.englishNotation : lastPlayedNote.latinNotation }}</div>
        <div class="piano">
            <div v-for="note, inx in PIANO_ROLL"
                :style="{ zIndex: 100 - inx, background: heldNotes.includes(note.englishNotation) ? `linear-gradient(45deg, ivory, #7d65c5)` : '' }"
                @mousedown="attackNote(note,
                    0.75)" @mouseup="releaseNote(note)" @mouseleave="releaseNote(note)" class="note">
                <div :style="{ background: heldNotes.includes(note.englishNotation[0] + '#' + note.englishNotation[1]) ? `linear-gradient(45deg, black, #7d65c5)` : '' }"
                    @mousedown="(e) => {
                        e.stopPropagation(); attackNote(midiIndexToNote(note.midiIndex + 1),
                            0.75)
                    }" @mouseup="releaseNote(midiIndexToNote(note.midiIndex + 1))"
                    @mouseleave="releaseNote(midiIndexToNote(note.midiIndex + 1))" class="note black"
                    v-if="!note.englishNotation.includes('E') && !note.englishNotation.includes('B')">
                </div>
            </div>
        </div>
    </div>
    <PianoLoadingModal :is-open="loadingModalOpen" :is-loaded="isLoaded" @close="start(); loadingModalOpen = false" />
    <PianoSettingsModal :attack="attack" :release="release" :sustain="sustain" :instrument-played="instrumentPlayed"
        @instrument-change="val => instrumentPlayed = val" @attack-change="val => attack = val"
        @release-change="val => release = val" @sustain-change="val => sustain = val" :is-open="settingsModalOpen"
        @close="settingsModalOpen = false" :is-english-notation="isEnglishNotation"
        @notation-toggle="val => isEnglishNotation = val" />
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

.settings {
    cursor: pointer;
    background: transparent;
    position: fixed;
    right: 8px;
    top: 8px
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

#notePlayed {
    font-size: 3rem;
}
</style>