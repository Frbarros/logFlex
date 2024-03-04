  export function formatPhoneNumber(input) {
    const phoneNumber = input.replace(/\D/g, '').substring(0, 11);

    if (!phoneNumber) {
        return input;
    }
    let formattedNumber = '(' + phoneNumber.substring(0, 2) + ') ';
    formattedNumber += phoneNumber.substring(2, 7) + '-';
    formattedNumber += phoneNumber.substring(7, 11);

    return formattedNumber;
  };

  export function formatCPF(input) {
    const numerosCpf = input.replace(/[^\d]/g, '');
  
    if (!numerosCpf) {
      return input;
    }
    let formattedNumber = numerosCpf.substring(0, 3) + '.';
    formattedNumber += numerosCpf.substring(3, 6) + '.';
    formattedNumber += numerosCpf.substring(6, 9) + '-';
    formattedNumber += numerosCpf.substring(9, 11);

    return formattedNumber;
  };

  export function formatCnpj(input) {
    const numerosCnpj = input.replace(/\D/g, '');
  
    if (!numerosCnpj) {
      return input;
    }
    let formattedNumber = numerosCnpj.substring(0, 2) + '.';
    formattedNumber += numerosCnpj.substring(2, 5) + '.';
    formattedNumber += numerosCnpj.substring(5, 8) + '/';
    formattedNumber += numerosCnpj.substring(8, 12) + '-';
    formattedNumber += numerosCnpj.substring(12, 14);

    return formattedNumber;
  };

  export function formatCEP(cep) {
    const numerosCEP = cep.replace(/[^\d]/g, '');
  
    if (!numerosCEP) {
      return input;
    }
    let formattedNumber = numerosCEP.substring(0, 5) + '-';
    formattedNumber += numerosCEP.substring(5, 8);

    return formattedNumber;
  };

  export function formatWidth(width) {
    const numerosWidth = width.replace(/[^\d]/g, '');
  
    if (!numerosWidth) {
      return input;
    }
    let formattedNumber = numerosWidth.substring(0, 1) + ',';
    formattedNumber += numerosWidth.substring(1, 3) + 'cm';

    return formattedNumber;
  };
  export function formatWeight(weight) {
    const numerosWeight = weight.replace(/[^\d]/g, '');
  
    if (!numerosWeight) {
      return input;
    }
    let formattedNumber = numerosWeight.substring(0, 1) + ',';
    formattedNumber += numerosWeight.substring(1, 4) + 'kg';

    return formattedNumber;
  };
  export function formatLenght(lenght) {
    const numerosLenght = lenght.replace(/[^\d]/g, '');
  
    if (!numerosLenght) {
      return input;
    }
    let formattedNumber = numerosLenght.substring(0, 1) + ',';
    formattedNumber += numerosLenght.substring(1, 3) + 'cm';

    return formattedNumber;
  };
  export function formatHeight(height) {
    const numerosHeight = height.replace(/[^\d]/g, '');
  
    if (!numerosHeight) {
      return input;
    }
    let formattedNumber = numerosHeight.substring(0, 1) + ',';
    formattedNumber += numerosHeight.substring(1, 3) + 'cm';

    return formattedNumber;
  };