import { getRandomInt } from "./random";

import intro_plains from "../assets/videos/intro_plains_v3.mp4";
import intro_forest from "../assets/videos/intro_forest_v5.mp4";
import intro_submerged from "../assets/videos/intro_submerged_v3.mp4";

export function getLandingPageVideo() {
    const videos = [intro_plains, intro_forest, intro_submerged];
    return videos[getRandomInt(0, 3)];
}
