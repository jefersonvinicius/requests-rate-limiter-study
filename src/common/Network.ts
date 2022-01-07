import os from 'os';

export class Network {
  static publicIP() {
    const interfaces = os.networkInterfaces();
    for (const netInterfaceName of Object.keys(interfaces)) {
      for (const network of interfaces[netInterfaceName] ?? []) {
        if (network.family === 'IPv4' && !network.internal && network.address !== '127.0.0.1') {
          return network.address;
        }
      }
    }
    return '';
  }
}
