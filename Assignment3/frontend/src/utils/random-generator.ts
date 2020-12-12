
export const GetRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
}


export const GetRandomLetter = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return characters.charAt(Math.floor(Math.random() * characters.length));
}