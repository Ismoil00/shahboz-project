export const loginSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 4,
      maxLength: 100,
      pattern: "^(?!\\d)(?!\\d+$)[^\\s]+$",
      errorMessage: {
        minLength: "Имя пользователя должно быть длиной не менее 4 символов.",
        maxLength: "Имя пользователя не должно превышать 100 символов.",
        pattern:
          "Имя пользователя не может начинаться с цифры, состоять только из цифр или содержать пробелы.",
      },
    },
    password: {
      type: "string",
      minLength: 4,
      // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_\\-+=])[A-Za-z\\d~!@#$%^&*()_\\-+=]{6,}$",
      not: {
        pattern: "\\s",
      },
      errorMessage: {
        minLength: "Пароль должен быть длиной не менее 4 символов.",
        // pattern: "Пароль должен содержать заглавные и строчные буквы, цифры и специальные символы.",
        not: "Пароль не должен содержать пробелов.",
      },
    },
  },
  required: ["username", "password"],
  additionalProperties: false,
};
