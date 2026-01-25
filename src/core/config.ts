import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IP = '192.168.0.5';
const DEFAULT_PORT = '8000';

class ConfigManager {
  private static instance: ConfigManager;
  private ip: string = DEFAULT_IP;
  private port: string = DEFAULT_PORT;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const savedIp = await AsyncStorage.getItem('serverIp');
      const savedPort = await AsyncStorage.getItem('serverPort');
      
      if (savedIp) this.ip = savedIp;
      if (savedPort) this.port = savedPort;
      
      this.initialized = true;
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

  getApiBaseUrl(): string {
    return `http://${this.ip}:${this.port}/`;
  }

  getChatWsUrl(): string {
    return `ws://${this.ip}:${this.port}/`;
  }

  getIp(): string {
    return this.ip;
  }

  getPort(): string {
    return this.port;
  }

  async setIp(newIp: string): Promise<void> {
    this.ip = newIp;
    await AsyncStorage.setItem('serverIp', newIp);
  }

  async setPort(newPort: string): Promise<void> {
    this.port = newPort;
    await AsyncStorage.setItem('serverPort', newPort);
  }

  async resetToDefaults(): Promise<void> {
    this.ip = DEFAULT_IP;
    this.port = DEFAULT_PORT;
    await AsyncStorage.removeItem('serverIp');
    await AsyncStorage.removeItem('serverPort');
  }
}

export const configManager = ConfigManager.getInstance();

// Legacy Config object for backward compatibility
const Config = {
  get API_BASE_URL() {
    return configManager.getApiBaseUrl();
  },
  get CHAT_WS_URL() {
    return configManager.getChatWsUrl();
  },
};

export default Config;
