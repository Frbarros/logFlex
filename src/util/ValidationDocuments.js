export function validarCNH(cnh) {
  console.log('CNH:', cnh);

  if (cnh.length !== 11) {
    console.log('CNH inválida: comprimento incorreto');
    return false;
  }

  const pesos1 = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  const pesos2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const digitos = cnh.substring(9);

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cnh.charAt(i)) * pesos1[i];
  }
  let resultado1 = soma % 11;
  resultado1 = resultado1 > 9 ? 0 : resultado1;

  console.log('CNH: soma, resultado1, dígito 1', soma, resultado1, parseInt(digitos.charAt(0)));

  if (resultado1 !== parseInt(digitos.charAt(0))) {
    console.log('CNH inválida: dígito 1 incorreto');
    return false;
  }


  soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cnh.charAt(i)) * pesos2[i];
  }
  let resultado2 = soma % 11;
  resultado2 = resultado2 > 9 ? 0 : resultado2;

  console.log('CNH: soma, resultado2, dígito 2', soma, resultado2, parseInt(digitos.charAt(1)));

  if (resultado2 !== parseInt(digitos.charAt(1))) {
    console.log('CNH inválida: dígito 2 incorreto');
    return false;
  }

  console.log('CNH válida');
  return true;
}




export function validarCPF(cpf) {
  const cpfNumeros = cpf.replace(/[^\d]/g, '');

  if (cpfNumeros.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpfNumeros)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfNumeros.charAt(i - 1)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfNumeros.charAt(9))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfNumeros.charAt(i - 1)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpfNumeros.charAt(10))) {
    return false;
  }

  return true;
}