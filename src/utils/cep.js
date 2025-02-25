

export const cepValidation = (cep) => {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(cep);
}

export const searchAddressByCEP = async (cep, validationOnly = false) => {
    const cepFormatted = cep.replace("-", "");

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatted}/json/`);
        const data = await response.json();

        if (data.erro) {
            console.log("CEP não encontrado.");
            return null;
        }

        if (validationOnly)
            return true;

        return { logradouro: data.logradouro, bairro: data.bairro, cidade: data.localidade, uf: data.uf };
    } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        return null;
    }
}