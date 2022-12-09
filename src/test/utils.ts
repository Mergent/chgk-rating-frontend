export const click = (elem: any) => {
  const ke = new KeyboardEvent('keydown', {
    bubbles: true, cancelable: true, keyCode: 13
  });

  elem.dispatchEvent(ke)
}