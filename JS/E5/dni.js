var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
var dni = prompt('Introduce el número de tu DNI');

if (dni > 0 || dni < 99999999){44931
    var letra = dni % 23;
    alert("La letra de tu DNI es: " + letras[letra]);
} else {
    alert("End")
}

