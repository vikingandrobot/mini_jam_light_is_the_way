export function writeStoryText(text: string) {
  const textContainer = document.getElementById("story-text");
  if (textContainer) {
    textContainer.innerHTML = text;
  }
}

export function writeTopInstructionText(text: string) {
  const textContainer = document.getElementById("player-instructions-top");
  if (textContainer) {
    textContainer.innerHTML = text;
  }
}

export function writeBottomInstructionText(text: string) {
  const textContainer = document.getElementById("player-instructions-bottom");
  if (textContainer) {
    textContainer.innerHTML = text;
  }
}
