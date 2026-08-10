import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { accuracyForPosition, curveForLength, setup } from "../main";

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

  it("is symmetric around the middle of the context", () => {
    const length = 21;
    expect(accuracyForPosition(0, length)).toBeCloseTo(accuracyForPosition(length - 1, length), 5);
    expect(accuracyForPosition(5, length)).toBeCloseTo(accuracyForPosition(length - 1 - 5, length), 5);
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
});
