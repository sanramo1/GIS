var nums = [1, 2, 3, 4, 5, 6];

function sumaNumeros(lista) {
    var suma = 0;
    for (const i of lista ) {
    if (i % 2 == 0) {
        suma = suma + i;
    }
  }
  return suma;
}

console.log(sumaNumeros(nums))