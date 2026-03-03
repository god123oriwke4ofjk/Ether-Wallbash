import { SettingsSectionWithChildren } from "../src/settings/SettingsSection";
import DomRender from "../src/DomRender";
import { Component } from "../src/settings/settingsTypes";

const TEST_KEY = "test-input";
const TEST_VALUE = "test value";
let section = document.createElement("section");
let inputWrapper = DomRender.field({
  name: TEST_KEY,
  wrapperClasses: ["input-wrapper"],
  labelText: "test",
  value: "",
  type: "text",
});
section.append(inputWrapper);
document.body.append(section);

afterEach(() => {
  section.remove();
  section = document.createElement("section");
  inputWrapper = DomRender.field({
    name: TEST_KEY,
    wrapperClasses: ["input-wrapper"],
    labelText: "test",
    value: "",
    type: "text",
  });
  section.append(inputWrapper);
  document.body.append(section);
});

test("rendering an instance of SettingsSection updates inputs + labels to have the appropriate names, ids, etc", () => {
  // arrange
  let component: SettingsSectionWithChildren<any>;
  const mockChild: Component = {
    render: function () {
      const label = section.querySelector("label");
      if (label) {
        label.setAttribute("for", TEST_KEY);
      }
      const input = section.querySelector("input") as HTMLInputElement;
      if (input) {
        input.id = TEST_KEY;
        input.value = component.state[TEST_KEY];
      }
    },
    rerender: function () {
      this.render();
    },
  };

  component = new SettingsSectionWithChildren({
    title: "test-title",
    state: {
      [TEST_KEY]: TEST_VALUE,
    },
    sectionEl: section,
    children: [mockChild],
    onSave: () => {},
  });

  component.render();
  const label = section.querySelector("label");
  expect(label).not.toBe(null);
  expect(label?.getAttribute("for")).toBe(TEST_KEY);
  const input = document.getElementById(TEST_KEY) as HTMLInputElement;
  expect(input).not.toBe(null);
  expect(input.value).toBe(TEST_VALUE);
});

test("updateState updates the state when an input element changes", () => {
  // arrange
  let component: SettingsSectionWithChildren<any>;
  const mockChild: Component = {
    render: function () {
      const label = section.querySelector("label");
      if (label) {
        label.setAttribute("for", TEST_KEY);
      }
      const input = section.querySelector("input") as HTMLInputElement;
      if (input) {
        input.id = TEST_KEY;
        input.value = component.state[TEST_KEY];
        input.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          component.state[target.name] = target.value;
        });
      }
    },
    rerender: function () {
      this.render();
    },
  };

  component = new SettingsSectionWithChildren({
    title: "test-title",
    state: {
      [TEST_KEY]: TEST_VALUE,
    },
    sectionEl: section,
    children: [mockChild],
    onSave: () => {},
  });
  component.render();
  const event = new Event("input");
  const input = section.querySelector(`#${TEST_KEY}`) as HTMLInputElement;
  expect(input).not.toBe(null);

  input.dispatchEvent(event);
  expect(component.state[TEST_KEY]).toBe(TEST_VALUE);

  input.value = "new value";
  input.dispatchEvent(event);
  expect(component.state[TEST_KEY]).toBe("new value");
});