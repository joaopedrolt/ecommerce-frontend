import { searchAddressByCEP } from "@/utils/cep.js";

const EMPTY_FIELD_MESSAGE = "Esse campo não pode ser vazio!";
const INVALID_FORMAT_MESSAGE = "Formato inválido!";

const maxCharactersMessage = (maxCharacters) => {
  if (maxCharacters == 1)
    return `Digite no máximo 1 caracter!`;
  else
    return `Digite no máximo ${maxCharacters} caracteres!`;
}

export const emailRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (!(/.+@.+\..+/.test(value)))
      return "O E-mail precisa ser válido!";
    return true;
  },
];

export const passwordRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (!(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)))
      return "A senha requer no mínimo 8 caracteres, incluindo letras e números!";
    return true;
  },
];

export const nomeRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length < 2)
      return "Preencha com um nome completo!";
    return true;
  },
  (value) => {
    let maxCharacters = 75;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true;
  },
];

export const sobrenomeRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length < 2)
      return "Preencha com um sobrenome completo!";
    return true;
  },
  (value) => {
    let maxCharacters = 75;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true;
  },
];

export const cpfRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (!(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)))
      return INVALID_FORMAT_MESSAGE;
    return true;
  },
];

export const bairroRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true
  },
  (value) => {
    let maxCharacters = 150;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const enderecoRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true
  },
  (value) => {
    let maxCharacters = 70;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const estadoRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  /*   (value) => {
      if (value.length == 0)
        return EMPTY_FIELD_MESSAGE;
      return true
    }, */
  /*   (value) => {
      let maxCharacters = 70;
      if (value.length > maxCharacters)
        return maxCharactersMessage(maxCharacters);
      return true
    }, */
];

export const cidadeRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true
  },
  (value) => {
    let maxCharacters = 36;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const numeroRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    let maxCharacters = 5;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true;
  },
];

export const complementoRules = [
  (value) => {
    let maxCharacters = 20;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const telefoneRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length < 14)
      return INVALID_FORMAT_MESSAGE;
    return true
  },
  (value) => {
    let maxCharacters = 15;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const cepRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (!(/^[0-9]{5}-?[0-9]{3}$/.test(value)))
      return INVALID_FORMAT_MESSAGE;
    return true;
  },
  async (value) => {
    return await searchAddressByCEP(value, true) ? true : "Cep não encontrado!";
  },
];

export const cardNumberRules = [
  (value) => {
    if (value === undefined || value === null) {
      return EMPTY_FIELD_MESSAGE;
    }
    return true;
  },
  (value) => {
    if (value.length === 0) {
      return EMPTY_FIELD_MESSAGE;
    }
    return true;
  },
  (value) => {
    if (!/^(?:\d{4} \d{4} \d{4} \d{3}|\d{4} \d{4} \d{4} \d{4})$/.test(value)) {
      return INVALID_FORMAT_MESSAGE;
    }
    return true;
  }
];

export const expirationDateRules = [
  (value) => {
    if (value === undefined || value === null) {
      return EMPTY_FIELD_MESSAGE;
    }
    return true;
  },
  (value) => {
    if (value.length === 0) {
      return EMPTY_FIELD_MESSAGE;
    }
    return true;
  },
  (value) => {
    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(value)) {
      return INVALID_FORMAT_MESSAGE;
    }
    return true;
  },
  (value) => {
    const [month, year] = value.split("/").map(Number);
    if (month < 1 || month > 12) {
      return INVALID_FORMAT_MESSAGE;
    }
    return true;
  },
  (value) => {
    const [month, year] = value.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // Months are 0-based
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "A validade do cartão já expirou.";
    }
    if (year > currentYear + 20) {
      return "O ano de validade do cartão é inválido.";
    }
    return true;
  },
];

export const cardCvcRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true
  },
  (value) => {
    let maxCharacters = 4;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const cardNameRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true
  },
  (value) => {
    let maxCharacters = 30;
    if (value.length > maxCharacters)
      return maxCharactersMessage(maxCharacters);
    return true
  },
];

export const installmentsRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  }
];
