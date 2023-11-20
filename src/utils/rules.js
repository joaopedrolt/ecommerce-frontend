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
