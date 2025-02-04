<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import Column from "@/components/Column.vue";
import Col from "@/components/Column.vue";
import Row from "@/components/Row.vue";
import StatusCard from "@/components/StatusPage/StatusCard.vue";
import StatusCardSubtitle from "@/components/StatusPage/StatusCardSubtitle.vue";
import StatusCardTitle from "@/components/StatusPage/StatusCardTitle.vue";
import StatusProgressBar from "@/components/StatusPage/StatusProgressBar.vue";
import StatusRow from "@/components/StatusPage/StatusRow.vue";

const cpus = [
    51,
    23,
    31,
    21
]
const memoryUsage = 31
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
                <StatusCardTitle title="Informations système" />
                <StatusRow label="Uptime" value="1hr, 53mn, 12s" />
                <StatusRow label="CPU Temp" value="51°C" />
                <StatusCardSubtitle subtitle="CPU Usage" />
                <Column>
                    <StatusProgressBar v-for="cpu, inx in cpus" :label="'CPU ' + inx" :value="cpu" />
                </Column>
                <StatusCardSubtitle subtitle="Memory Usage" />
                <StatusProgressBar label="Memory used" :value="memoryUsage" />
            </StatusCard>
            <StatusCard>
                <StatusCardTitle title="Peribot" />
                <StatusRow label="Uptime" value="1day, 2hr, 11mn, 31s" />
                <StatusRow label="Statut" value="🟢 Online" />
                <StatusCardSubtitle subtitle="CPU Usage" />
                <StatusProgressBar label="CPU" :value="5" />
                <StatusCardSubtitle subtitle="Memory Usage" />
                <StatusProgressBar label="Memory used" :value="57" />
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
