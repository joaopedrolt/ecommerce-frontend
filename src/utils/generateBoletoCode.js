export default () => {
    function getRandomNumber(length) {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }

    const part1 = getRandomNumber(10);
    const part2 = getRandomNumber(11);
    const part3 = getRandomNumber(11);
    const part4 = getRandomNumber(1);
    const part5 = getRandomNumber(14);

    return `${part1} ${part2} ${part3} ${part4} ${part5}`;
};