// The core mechanic: given where a fact sits in a context window and how
// long that window is, estimate how reliably a model recalls it. This is a
// hand-tuned illustrative model of the U-shaped "lost in the middle" effect
// (Liu et al. 2023, https://arxiv.org/abs/2307.03172) — not a reproduction
// of the paper's own numbers. See the caveat in index.html.

/** Recall estimate (0..1) for a fact at `position` (0-based) in a context of `length` chunks. */
export function accuracyForPosition(position: number, length: number): number {
  const normalized = length <= 1 ? 0.5 : position / (length - 1);
  const edgeBoost = 1 - 4 * normalized * (1 - normalized); // 1 at the edges, 0 at the exact middle
  const peak = clamp(0.95 - 0.004 * length, 0.6, 0.95);
  const floor = clamp(0.75 - 0.012 * length, 0.15, 0.75);
  return floor + (peak - floor) * edgeBoost;
}

/** The full recall curve across every position in a context of `length` chunks. */
export function curveForLength(length: number): number[] {
  return Array.from({ length }, (_, position) => accuracyForPosition(position, length));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function toPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/** Wires the sliders, chunk row, readout and chart to the recall model. Exported so tests can drive it against a JSDOM document without a real browser. */
export function setup(doc: Document): void {
  const lengthInput = doc.getElementById("length") as HTMLInputElement | null;
  const positionInput = doc.getElementById("position") as HTMLInputElement | null;
  const lengthValue = doc.getElementById("length-value");
  const lengthValue2 = doc.getElementById("length-value-2");
  const positionValue = doc.getElementById("position-value");
  const chunks = doc.getElementById("chunks");
  const readout = doc.getElementById("readout");
  const chart = doc.getElementById("chart");

  if (!lengthInput || !positionInput || !chunks || !readout || !chart) return;

  function render(): void {
    if (!lengthInput || !positionInput || !chunks || !readout || !chart) return;

    const length = Number(lengthInput.value);
    positionInput.max = String(length - 1);
    const position = Math.min(Number(positionInput.value), length - 1);
    positionInput.value = String(position);

    if (lengthValue) lengthValue.textContent = String(length);
    if (lengthValue2) lengthValue2.textContent = String(length);
    if (positionValue) positionValue.textContent = String(position + 1);

    chunks.innerHTML = "";
    for (let i = 0; i < length; i++) {
      const chunk = doc.createElement("span");
      chunk.className = i === position ? "chunk chunk-key" : "chunk";
      chunks.appendChild(chunk);
    }

    const accuracy = accuracyForPosition(position, length);
    readout.textContent = `Estimated recall at chunk ${position + 1} of ${length}: ${toPercent(accuracy)}`;

    renderChart(chart, curveForLength(length), position);
  }

  lengthInput.addEventListener("input", render);
  positionInput.addEventListener("input", render);
  render();
}

const CHART_WIDTH = 400;
const CHART_HEIGHT = 160;
const CHART_PAD = 16;

function renderChart(svg: Element, curve: number[], position: number): void {
  const plotWidth = CHART_WIDTH - CHART_PAD * 2;
  const plotHeight = CHART_HEIGHT - CHART_PAD * 2;
  const xFor = (i: number) => CHART_PAD + (curve.length <= 1 ? plotWidth / 2 : (i / (curve.length - 1)) * plotWidth);
  const yFor = (v: number) => CHART_PAD + (1 - v) * plotHeight;

  const points = curve.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");
  const currentX = xFor(position);
  const currentY = yFor(curve[position] ?? 0);

  svg.innerHTML = `
    <title id="chart-title">Estimated recall by position</title>
    <desc id="chart-desc">
      A curve showing estimated recall accuracy across every position
      in the current context length, with the current position marked.
    </desc>
    <line x1="${CHART_PAD}" y1="${CHART_PAD}" x2="${CHART_PAD}" y2="${CHART_HEIGHT - CHART_PAD}" class="chart-axis" />
    <line x1="${CHART_PAD}" y1="${CHART_HEIGHT - CHART_PAD}" x2="${CHART_WIDTH - CHART_PAD}" y2="${CHART_HEIGHT - CHART_PAD}" class="chart-axis" />
    <polyline points="${points}" class="chart-line" fill="none" />
    <circle cx="${currentX}" cy="${currentY}" r="6" class="chart-dot" />
  `;
}

if (typeof document !== "undefined") {
  setup(document);
}
