export enum Input {
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
  private inputs: Record<Input, boolean> = {
    [Input.KeyA]: false,
    [Input.KeyW]: false,
    [Input.KeyS]: false,
    [Input.KeyD]: false,
    [Input.ArrowDown]: false,
    [Input.ArrowLeft]: false,
    [Input.ArrowRight]: false,
    [Input.ArrowUp]: false,
    [Input.Space]: false,
  };

  isInputEnabled(inputKey: Input): boolean {
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
          this.inputs[Input.ArrowRight] = true;
          break;

        case "ArrowLeft":
          this.inputs[Input.ArrowLeft] = true;
          break;

        case "ArrowUp":
          this.inputs[Input.ArrowUp] = true;
          break;

        case "ArrowDown":
          this.inputs[Input.ArrowDown] = true;
          break;

        case "Space":
          this.inputs[Input.Space] = true;
          break;

        case "KeyA":
          this.inputs[Input.KeyA] = true;
          break;

        case "KeyW":
          this.inputs[Input.KeyW] = true;
          break;

        case "KeyD":
          this.inputs[Input.KeyD] = true;
          break;

        case "KeyS":
          this.inputs[Input.KeyS] = true;
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
          this.inputs[Input.ArrowRight] = false;
          break;

        case "ArrowLeft":
          this.inputs[Input.ArrowLeft] = false;
          break;

        case "ArrowUp":
          this.inputs[Input.ArrowUp] = false;
          break;

        case "ArrowDown":
          this.inputs[Input.ArrowDown] = false;
          break;

        case "Space":
          this.inputs[Input.Space] = false;
          break;

        case "KeyA":
          this.inputs[Input.KeyA] = false;
          break;

        case "KeyW":
          this.inputs[Input.KeyW] = false;
          break;

        case "KeyD":
          this.inputs[Input.KeyD] = false;
          break;

        case "KeyS":
          this.inputs[Input.KeyS] = false;
          break;
      }
      console.log(event.code);
    });
  }
}
