export const formValidation = ({ firstName, lastName, password, email }) => {
  if (!firstName) {
    return "Değerler boş olamaz";
  }
  if (!lastName) {
    return "Soy İsim boş olamaz";
  }
  if (!password) {
    return "Parola boş olamaz";
  }
  if (!email) {
    return "E-Posta boş olamaz";
  }

  if (password.length < 6) {
    return "Parola Zayıf";
  }
  if (!email.includes("@")) {
    return "E-Posta Geçerli Değil";
  }

  return false;
};
