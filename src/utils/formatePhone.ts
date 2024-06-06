import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const formatPhoneNumber = (phoneNumber: string): string => {
  const numericPhone = phoneNumber.replace(/\D/g, "");
  
  const phoneNumberObject = parsePhoneNumberFromString(numericPhone, "BR");
  if (phoneNumberObject && phoneNumberObject.isValid()) {
    return phoneNumberObject.formatInternational().replace("+55", ""); // Remova o código do país
  } else {
    // Se o número de telefone não for válido, retorne uma string vazia
    return "";
  }
};
