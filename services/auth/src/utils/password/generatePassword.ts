export const  generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    const charactersLength = characters.length;

    // Ensure at least one of each type
    result += characters[Math.floor(Math.random() * 26)]; // Uppercase letter
    result += characters[Math.floor(Math.random() * 26) + 26]; // Lowercase letter
    result += characters[Math.floor(Math.random() * 10) + 52]; // Number
    result += characters[Math.floor(Math.random() * 23) + 62]; // Special character

    // Fill the rest randomly
    for (let i = 4; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Shuffle the result
    return result.split('').sort(() => 0.5 - Math.random()).join('');
}