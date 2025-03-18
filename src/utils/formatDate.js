export default (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Sao_Paulo",
    }).format(date);
};