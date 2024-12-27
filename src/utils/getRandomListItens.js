export default (list, count) => {
    return list.sort(() => 0.5 - Math.random()).slice(0, count);
};