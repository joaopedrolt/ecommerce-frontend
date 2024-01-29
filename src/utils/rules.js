export const emailRules = [
  (value) => {
    if (value) return true;
    return "E-mail não pode ser vazio.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;
    return "E-mail precisa ser válido.";
  },
];

export const passwordRules = [
  (value) => {
    if (/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) return true;
    return "A senha requer no mínimo 8 caracteres, incluindo letras e números.";
  },
];

export const nomeRules = [
  (value) => {
    if (value.length < 5)
      return "Preencha o nome completo.";

    if (value.split(/\s+/).length == 1)
      return "Preencha o nome completo.";

    if (value.length > 150)
      return "Digite no máximo 150 caracteres.";

    return true
  },
];

export const CPFRules = [
  (value) => {
    if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) return true;
    return "Formato inválido.";
  },
];

export const bairroRules = [
  (value) => {
    if (value.length < 1)
      return "Preencha este campo.";

    if (value.length > 150)
      return "Digite no máximo 150 caracteres.";

    return true
  },
];

export const enderecoRules = [
  (value) => {
    if (value.length == 0)
      return "Preencha este campo.";

    if (value.length > 70)
      return "Digite no máximo 70 caracteres.";

    return true
  },
];

export const numeroRules = [
  (value) => {
    if (value.length == 0)
      return "Preencha este campo.";

    if (value.length > 5)
      return "Digite no máximo 5 caracteres.";

    return true
  },
];

export const complementoRules = [
  (value) => {
    if (value.length > 20)
      return "Digite no máximo 20 caracteres.";

    return true
  },
];

export const telefoneRules = [
  (value) => {
    if (value.length > 11)
      return "Digite pelo menos 11 caracteres.";

    return true
  },
];

export const CEPRules = [
  (value) => {
    if (/^\d{5}-\d{3}$/.test(value)) return true;
    return "Formato inválido.";
  },
];