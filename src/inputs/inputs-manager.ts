export enum Inputs {
  "KeyA" = "KeyA",
  "KeyW" = "KeyW",
  "KeyS" = "KeyS",
  "KeyD" = "KeyD",
  "ArrowLeft" = "ArrowLeft",
  "ArrowUp" = "ArrowUp",
  "ArrowRight" = "ArrowRight",
  "ArrowDown" = "ArrowDown",
  "Space" = "Space",
}

export class InputsManager {
  private inputs: Record<Inputs, boolean> = {
    [Inputs.KeyA]: false,
    [Inputs.KeyW]: false,
    [Inputs.KeyS]: false,
    [Inputs.KeyD]: false,
    [Inputs.ArrowDown]: false,
    [Inputs.ArrowLeft]: false,
    [Inputs.ArrowRight]: false,
    [Inputs.ArrowUp]: false,
    [Inputs.Space]: false,
  };

  isInputEnabled(inputKey: Inputs): boolean {
    return !!this.inputs[inputKey];
  }

  init() {
    this.registerKeyboardListeners();
  }

  private registerKeyboardListeners() {
    this.registerKeyDownListener();
    this.registerKeyUpListener();
  }

  private registerKeyDownListener() {
    document.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }

      switch (event.code) {
        case "ArrowRight":
          this.inputs[Inputs.ArrowRight] = true;
          break;

        case "ArrowLeft":
          this.inputs[Inputs.ArrowLeft] = true;
          break;

        case "ArrowUp":
          this.inputs[Inputs.ArrowUp] = true;
          break;

        case "ArrowDown":
          this.inputs[Inputs.ArrowDown] = true;
          break;

        case "Space":
          this.inputs[Inputs.Space] = true;
          break;

        case "KeyA":
          this.inputs[Inputs.KeyA] = true;
          break;

        case "KeyW":
          this.inputs[Inputs.KeyW] = true;
          break;

        case "KeyD":
          this.inputs[Inputs.KeyD] = true;
          break;

        case "KeyS":
          this.inputs[Inputs.KeyS] = true;
          break;
      }
      console.log(event.code);
    });
  }

  private registerKeyUpListener() {
    document.addEventListener("keyup", (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }

      switch (event.code) {
        case "ArrowRight":
          this.inputs[Inputs.ArrowRight] = false;
          break;

        case "ArrowLeft":
          this.inputs[Inputs.ArrowLeft] = false;
          break;

        case "ArrowUp":
          this.inputs[Inputs.ArrowUp] = false;
          break;

        case "ArrowDown":
          this.inputs[Inputs.ArrowDown] = false;
          break;

        case "Space":
          this.inputs[Inputs.Space] = false;
          break;

        case "KeyA":
          this.inputs[Inputs.KeyA] = false;
          break;

        case "KeyW":
          this.inputs[Inputs.KeyW] = false;
          break;

        case "KeyD":
          this.inputs[Inputs.KeyD] = false;
          break;

        case "KeyS":
          this.inputs[Inputs.KeyS] = false;
          break;
      }
      console.log(event.code);
    });
  }
}
