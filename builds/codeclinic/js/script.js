const rows = 8, columns = 8;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

function moves(coordinate) {
  let startIndex = letters.indexOf(coordinate[0].toUpperCase());
  document.querySelector("#" + coordinate).firstElementChild.setAttribute('fill', '#41B3A3');

  for (let i = 0; i < 8; i++) {
    let letter = String.fromCharCode('a'.charCodeAt(0) + i);

    if (letter.toUpperCase() !== coordinate[0] && (i + 1) !== coordinate[1]) {
      document.querySelector("#" + letter.toUpperCase() + coordinate[1]).firstElementChild.setAttribute('fill', '#C38D9E');
      document.querySelector("#" + coordinate[0] + (i + 1)).firstElementChild.setAttribute('fill', '#C38D9E');
    }
  }

  for (let i = startIndex; i > 0; i--) {
    console.log(letters[i - 1], i);
    if (startIndex !== letters.length - 1)
      console.log(letters[++startIndex], i);
  }
};

moves("E5");