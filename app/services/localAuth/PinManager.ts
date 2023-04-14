import * as SecureStore from 'expo-secure-store';

export default class PinManager {
    static async setPin(pin: string): Promise<void> {
        await SecureStore.setItemAsync('userPin', pin);
    }

    static async getPin(): Promise<string | null> {
        return await SecureStore.getItemAsync('userPin');
    }

    static async verifyPin(pin: string): Promise<boolean> {
        const storedPin = await PinManager.getPin();
        return storedPin === pin;
    }
}
