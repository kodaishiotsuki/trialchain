//mockAPI 開発速度を上げる
import { delay } from "../common/util/util";
import { sampleData } from "./sampleData";

export function fetchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(sampleData);
  });
}
