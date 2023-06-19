export default {
    password(password: string) {
      if (password.length < 8) {
        throw new Error('Password length should be at least 8 characters.');
      }
    },
  
    required(entity: any, fields: string[]) {
      const errors = fields.filter((field) => {
        const value = entity[field];
        return value === null || value === undefined || isNaN(value);
      });
  
      if (errors.length) {
        throw new Error('Required fields are missing: ' + errors.join(', '));
      }
    },
  
    username(username: string) {
      const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
      for (const char of username) {
        if (validChars.indexOf(char.toLowerCase()) === -1) {
          throw new Error('Username should not contain special characters.');
        }
      }
      return true;
    },
  
    cep(cep: string) {
      if (cep.length !== 8) {
        throw new Error('CEP should have 8 digits.');
      }
      const validChars = '0123456789';
      for (const char of cep) {
        if (validChars.indexOf(char) === -1) {
          throw new Error('CEP should only contain numbers.');
        }
      }
      return true;
    },
  
    numeric(number: any) {
      return !isNaN(Number(number));
    },
  
    phone(phone: string) {
      return phone.length === 11;
    },
  
    date(date: string) {
      console.log(date);
      // TODO
    },
  
    email(email: string) {
      const regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!regexp.test(email)) {
        throw new Error('Invalid email address.');
      }
    },
  
    cpf(cpf: string): boolean {
      if (cpf == null) {
        throw new Error('Incorrect CPF.');
      }
      if (cpf.length !== 11) {
        throw new Error('Incorrect CPF.');
      }
      if (
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
      ) {
        throw new Error('Incorrect CPF.');
      }
      let number: number = 0;
      let character: string = '';
      let numbers: string = '0123456789';
      let j: number = 10;
      let sum: number = 0;
      let remainder: number = 0;
      let digit1: number = 0;
      let digit2: number = 0;
      let cpfAux: string = '';
      cpfAux = cpf.substring(0, 9);
      for (let i: number = 0; i < 9; i++) {
        character = cpfAux.charAt(i);
        if (numbers.search(character) === -1) {
          throw new Error('Incorrect CPF.');
        }
        number = Number(character);
        sum = sum + number * j;
        j--;
      }
      remainder = sum % 11;
      digit1 = 11 - remainder;
      if (digit1 > 9) {
        digit1 = 0;
      }
      j = 11;
      sum = 0;
      cpfAux = cpfAux + digit1;
      for (let i: number = 0; i < 10; i++) {
        character = cpfAux.charAt(i);
        number = Number(character);
        sum = sum + number * j;
        j--;
      }
      remainder = sum % 11;
      digit2 = 11 - remainder;
      if (digit2 > 9) {
        digit2 = 0;
      }
      cpfAux = cpfAux + digit2;
      if (cpf !== cpfAux) {
        throw new Error('Incorrect CPF.');
      }
  
      return true;
    },
  
    cnpj(value: string) {
      if (!value) {
        throw new Error('Incorrect CNPJ');
      }
  
      const isString = typeof value === 'string';
      const validTypes = isString || Number.isInteger(value) || Array.isArray(value);
  
      if (!validTypes) {
        throw new Error('Incorrect CNPJ');
      }
  
      if (isString) {
        if (value.length > 18) {
          throw new Error('Incorrect CNPJ');
        }
  
        const digitsOnly = /^\d{14}$/.test(value);
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);
  
        if (!(digitsOnly || validFormat)) {
          throw new Error('Incorrect CNPJ');
        }
      }
  
      const match = value.toString().match(/\d/g);
      const numbers = Array.isArray(match) ? match.map(Number) : [];
  
      if (numbers.length !== 14) {
        throw new Error('Incorrect CNPJ');
      }
  
      const items = [...new Set(numbers)];
      if (items.length === 1) {
        throw new Error('Incorrect CNPJ');
      }
  
      const calculateDigit = (x: number) => {
        const slice = numbers.slice(0, x);
        let factor = x - 7;
        let sum = 0;
  
        for (let i = x; i >= 1; i--) {
          const number = slice[x - i];
          sum += number * factor--;
          if (factor < 2) {
            factor = 9;
          }
        }
  
        const result = 11 - (sum % 11);
  
        return result > 9 ? 0 : result;
      };
  
      const digit0 = calculateDigit(12);
      if (digit0 !== numbers[12]) {
        throw new Error('Incorrect CNPJ');
      }
  
      const digit1 = calculateDigit(13);
      if (digit1 !== numbers[13]) {
        throw new Error('Incorrect CNPJ');
      }
  
      return true;
    },
  };
  