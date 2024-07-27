const { execSync } = require('child_process');
const fs = require('fs');

// Функция для генерации ключей
export default function generateKeys(password) {
    try {
        // Генерация приватного ключа
        execSync(`openssl genpkey -algorithm RSA -out private_key.pem -aes256 -pass pass:${password}`);
        // Генерация публичного ключа
        execSync(`openssl rsa -pubout -in private_key.pem -out public_key.pem -passin pass:${password}`);

        console.log('Приватный и публичный ключи сгенерированы.');
    } catch (error) {
        console.error('Ошибка при генерации ключей:', error);
    }
}

export default function getPublicKey() {
    return fs.readFileSync('public_key.pem', 'utf8');
}

export default function encryptMessage(message, recipientPublicKey) {
    fs.writeFileSync('message.txt', message);
    fs.writeFileSync('recipient_public_key.pem', recipientPublicKey);

    try {
        execSync(`openssl pkeyutl -encrypt -pubin -inkey recipient_public_key.pem -in message.txt -out encrypted_message.bin`);
        const encryptedMessage = fs.readFileSync('encrypted_message.bin');
        return encryptedMessage.toString('base64');
    } catch (error) {
        console.error('Ошибка при шифровании сообщения:', error);
        return null;
    }
}

export default function decryptMessage(encryptedMessage, password) {
    fs.writeFileSync('encrypted_message.bin', Buffer.from(encryptedMessage, 'base64'));

    try {
        execSync(`openssl pkeyutl -decrypt -inkey private_key.pem -in encrypted_message.bin -out decrypted_message.txt -passin pass:${password}`);
        const decryptedMessage = fs.readFileSync('decrypted_message.txt', 'utf8');
        return decryptedMessage;
    } catch (error) {
        console.error('Ошибка при расшифровании сообщения:', error);
        return null;
    }
}

