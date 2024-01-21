import {
  writeBottomInstructionText,
  writeStoryText,
  writeTopInstructionText,
} from "./write-text";

export function clearAllText(): void {
  writeStoryText("");
  writeBottomInstructionText("");
  writeTopInstructionText("");
}
