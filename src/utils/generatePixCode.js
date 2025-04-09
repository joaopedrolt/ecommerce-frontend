export default () => {
    const key = "hash@pix.com";
    const name = "BancoDoBrasil";
    const city = "SaoPaulo";
    const amount = "50.00";

    const code = `00020126360014br.gov.bcb.pix01${key.length}${key}` +
        `52040000530398654${amount.length}${amount}` +
        `5802BR59${name.length}${name}60${city.length}${city}` +
        `62070503***1234566304ABCD`;

    return code;
};