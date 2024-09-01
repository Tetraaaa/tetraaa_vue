<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

onMounted(() => {
    setTimeout(() => {
        animateLines();
        animateCircles();
    }, 1);
});

onBeforeUnmount(() => {
    document.querySelectorAll<SVGElement>(".circle").forEach((e: SVGElement) => (e.style.display = "none"));
    document.querySelectorAll<SVGElement>(".circle-delayed").forEach((e: SVGElement) => (e.style.display = "none"));
    document.querySelectorAll<HTMLDivElement>(".pattern").forEach((el: HTMLElement) => {
        el.style.width = "0";
    });
    document.querySelectorAll<HTMLDivElement>(".line").forEach((el: HTMLElement) => {
        el.style.width = "0";
    });
    document.querySelectorAll<HTMLDivElement>(".line-2").forEach((el: HTMLElement) => {
        el.style.width = "0";
    });
    document.querySelectorAll<HTMLDivElement>(".line-3").forEach((el: HTMLElement) => {
        el.style.width = "0";
    });
});

function animateLines() {
    document.querySelectorAll<HTMLDivElement>(".pattern").forEach((el: HTMLElement) => {
        el.style.width = "100%";
    });
    document.querySelectorAll<HTMLDivElement>(".line").forEach((el: HTMLElement) => {
        el.style.width = "53%";
    });
    setTimeout(() => {
        document.querySelectorAll<HTMLDivElement>(".line-2").forEach((el: HTMLElement) => {
            el.style.width = "68%";
        });
    }, 150);
    setTimeout(() => {
        document.querySelectorAll<HTMLDivElement>(".line-3").forEach((el: HTMLElement) => {
            el.style.width = "67%";
        });
    }, 250);
}

function animateCircles() {
    document.querySelectorAll<SVGElement>(".circle").forEach((e: SVGElement) => (e.style.display = "block"));
    document.querySelectorAll<SVGAnimateElement>("#circle-animation").forEach((e: SVGAnimateElement) => e.beginElement());
    setTimeout(() => {
        document.querySelectorAll<SVGElement>(".circle-delayed").forEach((e: SVGElement) => (e.style.display = "block"));
        document.querySelectorAll<SVGAnimateElement>("#circle-animation-delayed").forEach((e: SVGAnimateElement) => e.beginElement());
    }, 150);
}
</script>

<template>
    <div style="overflow: hidden">
        <div class="pattern" style="top: 10vh; left: 0">
            <div class="container">
                <div class="pattern-inner"></div>
            </div>
        </div>
        <div class="pattern" style="bottom: 0; right: 0">
            <div class="container">
                <div class="pattern-inner"></div>
            </div>
        </div>
        <svg
            class="circle"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
            style="top: -25vw; left: -25vw"
        >
            <circle
                fill="none"
                stroke="#4d493e1a"
                stroke-width=".25"
                cx="50"
                cy="50"
                r="48"
                stroke-dasharray="360"
                stroke-linecap="round"
                transform="rotate(-90 ) translate(-100 0)"
            >
                <animate id="circle-animation" attributeName="stroke-dashoffset" values="360;0" dur="1.5s" begin="indefinite"></animate>
            </circle>
        </svg>
        <svg
            class="circle"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
            style="bottom: -25vw; right: -25vw"
        >
            <circle
                fill="none"
                stroke="#4d493e1a"
                stroke-width=".25"
                cx="50"
                cy="50"
                r="48"
                stroke-dasharray="360"
                stroke-linecap="round"
                transform="rotate(-90 ) translate(-100 0)"
            >
                <animate id="circle-animation" attributeName="stroke-dashoffset" values="360;0" dur="1.5s" begin="indefinite"></animate>
            </circle>
        </svg>
        <svg
            class="circle-delayed"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
            style="top: -25vw; left: -25vw"
        >
            <circle
                fill="none"
                stroke="#4d493e1a"
                stroke-width=".25"
                cx="50"
                cy="50"
                r="46"
                stroke-dasharray="360"
                stroke-linecap="round"
                transform="rotate(-90 ) translate(-100 0)"
            >
                <animate id="circle-animation-delayed" attributeName="stroke-dashoffset" values="360;0" dur="1.5s" begin="indefinite"></animate>
            </circle>
        </svg>
        <svg
            class="circle-delayed"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
            style="bottom: -25vw; right: -25vw"
        >
            <circle
                fill="none"
                stroke="#4d493e1a"
                stroke-width=".25"
                cx="50"
                cy="50"
                r="46"
                stroke-dasharray="360"
                stroke-linecap="round"
                transform="rotate(-90 ) translate(-100 0)"
            >
                <animate id="circle-animation-delayed" attributeName="stroke-dashoffset" values="360;0" dur="1.5s" begin="indefinite"></animate>
            </circle>
        </svg>
        <div class="line top-left-1"></div>
        <div class="line-2 top-left-2"></div>
        <div class="line bottom-right-1"></div>
        <div class="line-2 bottom-right-2"></div>
        <div class="line-3 top-left-3"></div>
        <div class="line-3 bottom-right-3"></div>
    </div>
</template>

<style scoped lang="scss">
svg {
    position: fixed;
    width: 50vw;
    display: none;
}

.pattern {
    border-top: 2px solid #4d493e;
    position: fixed;
    width: 0;
    transition: width 0.4s linear;
}

.container {
    padding: 0 4rem;
}

.pattern-inner {
    height: 40px;
    background-size:
        50px 3px,
        50px 1px,
        50px 1px,
        50px 1px,
        50px 1px,
        50px 1px,
        50px 1px,
        50px 1px,
        50px 1px;
    background-position:
        0 0,
        22px 4px,
        22px 5px,
        22px 6px,
        22px 7px,
        28px 12px,
        28px 13px,
        28px 14px,
        28px 15px;
    background-image: linear-gradient(90deg, #4d493e, #4d493e 10px, transparent 10px),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.4),
            rgba(#4d493e, 0.4) 1px,
            rgba(#4d493e, 0.8) 1px,
            rgba(#4d493e, 0.8) 2px,
            rgba(#4d493e, 0.9) 2px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.4) 3px,
            rgba(#4d493e, 0.4) 4px,
            transparent 4px,
            transparent 12px,
            rgba(#4d493e, 0.4) 12px,
            rgba(#4d493e, 0.4) 13px,
            rgba(#4d493e, 0.8) 13px,
            rgba(#4d493e, 0.8) 14px,
            rgba(#4d493e, 0.9) 14px,
            rgba(#4d493e, 0.9) 15px,
            rgba(#4d493e, 0.4) 15px,
            rgba(#4d493e, 0.4) 16px,
            transparent 16px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.9),
            rgba(#4d493e, 0.9) 1px,
            rgba(#4d493e, 1) 1px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 3px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.9) 4px,
            transparent 4px,
            transparent 12px,
            rgba(#4d493e, 0.9) 12px,
            rgba(#4d493e, 0.9) 13px,
            rgba(#4d493e, 1) 13px,
            rgba(#4d493e, 1) 14px,
            rgba(#4d493e, 1) 14px,
            rgba(#4d493e, 1) 15px,
            rgba(#4d493e, 0.9) 15px,
            rgba(#4d493e, 0.9) 16px,
            transparent 16px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.9),
            rgba(#4d493e, 0.9) 1px,
            rgba(#4d493e, 1) 1px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 3px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.9) 4px,
            transparent 4px,
            transparent 12px,
            rgba(#4d493e, 0.9) 12px,
            rgba(#4d493e, 0.9) 13px,
            rgba(#4d493e, 1) 13px,
            rgba(#4d493e, 1) 14px,
            rgba(#4d493e, 1) 14px,
            rgba(#4d493e, 1) 15px,
            rgba(#4d493e, 0.9) 15px,
            rgba(#4d493e, 0.9) 16px,
            transparent 16px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.4),
            rgba(#4d493e, 0.4) 1px,
            rgba(#4d493e, 0.8) 1px,
            rgba(#4d493e, 0.8) 2px,
            rgba(#4d493e, 0.9) 2px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.4) 3px,
            rgba(#4d493e, 0.4) 4px,
            transparent 4px,
            transparent 12px,
            rgba(#4d493e, 0.4) 12px,
            rgba(#4d493e, 0.4) 13px,
            rgba(#4d493e, 0.8) 13px,
            rgba(#4d493e, 0.8) 14px,
            rgba(#4d493e, 0.9) 14px,
            rgba(#4d493e, 0.9) 15px,
            rgba(#4d493e, 0.4) 15px,
            rgba(#4d493e, 0.4) 16px,
            transparent 16px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.4),
            rgba(#4d493e, 0.4) 1px,
            rgba(#4d493e, 0.8) 1px,
            rgba(#4d493e, 0.8) 2px,
            rgba(#4d493e, 0.9) 2px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.4) 3px,
            rgba(#4d493e, 0.4) 4px,
            transparent 4px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.9),
            rgba(#4d493e, 0.9) 1px,
            rgba(#4d493e, 1) 1px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 3px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.9) 4px,
            transparent 4px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.9),
            rgba(#4d493e, 0.9) 1px,
            rgba(#4d493e, 1) 1px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 2px,
            rgba(#4d493e, 1) 3px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.9) 4px,
            transparent 4px
        ),
        linear-gradient(
            90deg,
            rgba(#4d493e, 0.4),
            rgba(#4d493e, 0.4) 1px,
            rgba(#4d493e, 0.8) 1px,
            rgba(#4d493e, 0.8) 2px,
            rgba(#4d493e, 0.9) 2px,
            rgba(#4d493e, 0.9) 3px,
            rgba(#4d493e, 0.4) 3px,
            rgba(#4d493e, 0.4) 4px,
            transparent 4px
        );
    background-repeat: repeat-x;
}

.line,
.line-2,
.line-3 {
    background-color: #4d493e1a;
    height: 3px;
    width: 0%;
    transition: width 0.5s linear;
    position: fixed;

    &.top-left-1 {
        top: 0;
        left: 5vw;
        transform: rotate(45deg);
        transform-origin: left;
    }

    &.bottom-right-1 {
        bottom: 0;
        right: 5vw;
        transform: rotate(45deg);
        transform-origin: right;
    }

    &.top-left-2 {
        top: 0;
        left: 1vw;
        transform: rotate(45deg);
        transform-origin: left;
    }

    &.bottom-right-2 {
        bottom: 0;
        right: 1vw;
        transform: rotate(45deg);
        transform-origin: right;
    }

    &.top-left-3 {
        top: 0;
        left: -3vw;
        transform: rotate(45deg);
        transform-origin: left;
    }

    &.bottom-right-3 {
        bottom: 0;
        right: -3vw;
        transform: rotate(45deg);
        transform-origin: right;
    }
}
</style>
