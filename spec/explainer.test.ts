import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { accuracyForPosition, curveForLength, indexOfNearestCenter, setup } from "../main";

// The core interaction: moving either slider changes what the visitor sees
// (the highlighted chunk, the readout, the chart). These tests exercise the
// same functions the page wires up to the sliders, so they describe the
// contract rather than the markup.

describe("recall model (the shape the interaction is built on)", () => {
  it("recalls the start and end of a context better than the middle", () => {
    const length = 20;
    const start = accuracyForPosition(0, length);
    const middle = accuracyForPosition(10, length);
    const end = accuracyForPosition(length - 1, length);

    expect(start).toBeGreaterThan(middle);
    expect(end).toBeGreaterThan(middle);
  });

  // Was "is symmetric around the middle of the context" — that asserted a
  // clean U the paper doesn't actually show. Liu et al.'s figures have
  // primacy (start) recall edging out recency (end) recall; a truly
  // symmetric model was the bug, not a simplification worth keeping.
  it("recalls the start slightly better than the end, matching the paper's primacy-over-recency asymmetry", () => {
    const length = 21;
    const start = accuracyForPosition(0, length);
    const end = accuracyForPosition(length - 1, length);
    expect(start).toBeGreaterThan(end);
  });

  it("gets harder — a lower peak and a deeper dip — as the context grows", () => {
    const short = curveForLength(6);
    const long = curveForLength(36);

    expect(Math.max(...long)).toBeLessThan(Math.max(...short));
    expect(Math.min(...long)).toBeLessThan(Math.min(...short));
  });

  it("stays within a plausible 0..1 recall range at any length", () => {
    for (const length of [4, 10, 20, 40]) {
      for (const accuracy of curveForLength(length)) {
        expect(accuracy).toBeGreaterThanOrEqual(0);
        expect(accuracy).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("indexOfNearestCenter (the math behind dragging the key chunk)", () => {
  it("picks the closest center, including past either end", () => {
    const centers = [10, 30, 50, 70];
    expect(indexOfNearestCenter(centers, 52)).toBe(2);
    expect(indexOfNearestCenter(centers, -100)).toBe(0);
    expect(indexOfNearestCenter(centers, 1000)).toBe(3);
  });

  it("breaks a tie by keeping the earlier index", () => {
    expect(indexOfNearestCenter([10, 30], 20)).toBe(0);
  });
});

describe("wiring: the visitor moves a slider and the page updates", () => {
  function mountPage() {
    const dom = new JSDOM(`<!doctype html><html><body>
      <input type="range" id="length" min="4" max="40" step="2" value="20" />
      <input type="range" id="position" min="0" max="19" step="1" value="0" />
      <output id="length-value"></output>
      <output id="length-value-2"></output>
      <output id="position-value"></output>
      <div id="chunks"></div>
      <p id="readout"></p>
      <svg id="chart"></svg>
    </body></html>`);
    setup(dom.window.document);
    return dom.window.document;
  }

  it("highlights the chunk at the chosen position on load", () => {
    const doc = mountPage();
    const keyChunks = doc.querySelectorAll(".chunk-key");
    expect(keyChunks.length).toBe(1);
    expect(doc.getElementById("readout")?.textContent).toContain("chunk 1 of 20");
  });

  it("moves the highlighted chunk and updates the readout when the position slider changes", () => {
    const doc = mountPage();
    const position = doc.getElementById("position") as HTMLInputElement;

    position.value = "10";
    position.dispatchEvent(new doc.defaultView!.Event("input"));

    expect(doc.getElementById("readout")?.textContent).toContain("chunk 11 of 20");
    const chunks = Array.from(doc.querySelectorAll("#chunks .chunk"));
    expect(chunks[10]?.classList.contains("chunk-key")).toBe(true);
  });

  it("redraws the chart curve when the context length changes", () => {
    const doc = mountPage();
    const before = doc.getElementById("chart")?.innerHTML;

    const length = doc.getElementById("length") as HTMLInputElement;
    length.value = "8";
    length.dispatchEvent(new doc.defaultView!.Event("input"));

    const after = doc.getElementById("chart")?.innerHTML;
    expect(after).not.toBe(before);
    expect(doc.getElementById("length-value")?.textContent).toBe("8");
  });

  // The row of chunks is draggable, not just decorative — pressing and
  // moving the pointer over it should track the nearest chunk, same as
  // dragging the position slider would. jsdom never lays elements out, so
  // stub getBoundingClientRect on each chunk to give the drag math something
  // real to compare against.
  it("moves the key chunk to the nearest chunk under a dragged pointer", () => {
    const doc = mountPage();
    const chunks = doc.getElementById("chunks") as HTMLElement;

    Array.from(chunks.children).forEach((el, i) => {
      (el as HTMLElement).getBoundingClientRect = () =>
        ({ left: i * 20, width: 16, right: i * 20 + 16, top: 0, bottom: 0, height: 0, x: i * 20, y: 0, toJSON() {} }) as DOMRect;
    });
    (chunks as unknown as { setPointerCapture: (id: number) => void }).setPointerCapture = () => {};

    const PointerEventCtor = doc.defaultView!.PointerEvent ?? doc.defaultView!.MouseEvent;
    const event = new PointerEventCtor("pointerdown", { clientX: 205 }) as PointerEvent;
    Object.defineProperty(event, "pointerId", { value: 1 });
    chunks.dispatchEvent(event);

    expect(doc.getElementById("readout")?.textContent).toContain("chunk 11 of 20");
    expect(doc.querySelectorAll(".chunk-key").length).toBe(1);
  });

  // Regression: renderChart used to replace the whole SVG's innerHTML,
  // which silently deleted the <title>/<desc> the page's aria-labelledby
  // points at — invisible in jsdom, only surfaced by a real-browser axe
  // audit (svg-img-alt violation).
  it("keeps an accessible title and description on the chart after every render", () => {
    const doc = mountPage();
    const position = doc.getElementById("position") as HTMLInputElement;

    position.value = "5";
    position.dispatchEvent(new doc.defaultView!.Event("input"));

    const chart = doc.getElementById("chart");
    expect(chart?.querySelector("title")?.textContent).toBeTruthy();
    expect(chart?.querySelector("desc")?.textContent).toBeTruthy();
  });
});
