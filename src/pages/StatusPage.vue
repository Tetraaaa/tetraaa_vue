<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import Column from "@/components/Column.vue";
import Row from "@/components/Row.vue";
import StatusCard from "@/components/StatusPage/StatusCard.vue";
import StatusCardSubtitle from "@/components/StatusPage/StatusCardSubtitle.vue";
import StatusCardTitle from "@/components/StatusPage/StatusCardTitle.vue";
import StatusProgressBar from "@/components/StatusPage/StatusProgressBar.vue";
import StatusRow from "@/components/StatusPage/StatusRow.vue";
import { getStatus, type Status, } from "@/utils/status";
import { onMounted, ref } from "vue";

const data = ref<Status>()

function secondsToHumanReadable(seconds?: number) {
    if(!seconds)  return '0s'
    if (seconds < 60) return seconds + 's'
    let minutes = Math.floor(seconds/60)
    if (minutes < 60) return minutes + 'mn' + seconds%60 + 's'
    let hours = Math.floor(minutes/60)
    if (hours < 24) return hours + 'hr' + minutes%60 + 'mn' + seconds%60 + 's'
    let days = Math.floor(hours/24)
    return days + 'j' + hours%24 + 'hr' + minutes%60 + 'mn' + seconds%60 + 's'
}

function memoryUsedToPercentage(memTotal?: number, memFree?:number) {
    if(!memTotal || !memFree) return 0
    let memoryUsed = memTotal - memFree
    return Math.floor(memoryUsed * 100 / memTotal)
}

onMounted(() => {
    getStatus().then(val => data.value = val)
})


</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
    <BackButton />
    <div class="container">
        <h3>
            État des services
        </h3>
        <Row style="width: 100%;padding: 1rem;">
            <StatusCard>
                <StatusCardTitle title="Backend" />
                <StatusRow label="Statut" :value="data ? '🟢 Online' : '🔴 Offline' " />
                <StatusRow label="Uptime" :value="secondsToHumanReadable(data?.uptime)" />
                <StatusRow label="CPU Temp" :value="`${data?.cpuTemp || ' - '}°C`" />
                <StatusCardSubtitle subtitle="CPU Usage" />
                <Column>
                    <StatusProgressBar v-for="cpu, inx in data?.cpus || [0,0,0,0]" :label="'CPU ' + inx" :value="cpu" />
                </Column>
                <StatusCardSubtitle subtitle="Memory Usage" />
                <StatusProgressBar label="Memory used" :value="memoryUsedToPercentage(data?.memTotal, data?.memFree)" />
            </StatusCard>
            <StatusCard>
                <StatusCardTitle title="Peribot" />
                <StatusRow label="Statut" :value="data?.peribotStatus.status === 'running' ? '🟢 Online' : '🔴 Offline' " />
                <StatusRow label="Uptime" :value="secondsToHumanReadable(data?.peribotStatus.uptime)" />
                <StatusCardSubtitle subtitle="Souvenirs en cache" />
                <StatusRow label="Channels en cache" :value="data?.peribotStatus.cachedChannels.toString() || '0'" />
                <StatusRow label="Souvenirs totaux" :value="data?.peribotStatus.totalAttachments.toString() || '0'" />
            </StatusCard>
        </Row>
    </div>
</template>

<style scoped lang="scss">
h3 {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    margin: 2rem;
}

.container {
    background: rgb(26, 26, 27);
    background: radial-gradient(ellipse at center, rgba(26, 26, 27, 1) 0%, rgb(41, 41, 41) 35%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Geist";
}
</style>
