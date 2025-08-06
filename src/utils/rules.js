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

export const imageUploadRules = [
  (value) => {
    if (!value) return 'Este campo é obrigatório.';
    return true;
  },
  (value) => {
    if (value) {
      if (value.length > 0) {
        return true;
      }
    }

    return 'Este campo é obrigatório.';
  }
];

export const precoRules = [
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
  (value) => /^\d{1,3}(\.\d{3})*,\d{2}$|^\d+,\d{2}$|^\d+$/.test(value) || 'Formato de preço inválido (ex: 20,00)',
];

export const productImageRules = [
  (files) => {
    if (!files || files.length === 0) {
      return 'Pelo menos uma imagem é obrigatória';
    }
    if (files.length > 3) {
      return 'Máximo de 3 imagens permitidas';
    }
    // Check file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      return 'Apenas arquivos de imagem são permitidos (JPEG, PNG, GIF, WebP)';
    }
    // Check file sizes (5MB limit per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      return 'Cada imagem deve ter no máximo 5MB';
    }
    return true;
  }
];

export const notEmptyRules = [
  (value) => {
    if (value == undefined || value == null)
      return EMPTY_FIELD_MESSAGE;
    return true;
  },
  (value) => {
    if (value.length == 0)
      return EMPTY_FIELD_MESSAGE;
    return true;
  }
];
