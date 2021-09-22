export const prependZero = (number) => {
    if(parseInt(number) <= 9){
        number = '0' + number;
    }
    return number;
}