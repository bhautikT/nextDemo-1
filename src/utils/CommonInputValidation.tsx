export const handleKeyDown = (event: any) => {
  // Check if the space key is pressed and it's the first character
  if (event.key === " " && event.target.selectionStart === 0) {
    event.preventDefault();
  }
};
