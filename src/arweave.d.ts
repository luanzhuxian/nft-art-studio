declare module 'arweave' {
  class Arweave {
    constructor(config: any);
    static init(config: any): Arweave;
    wallets: {
      generate(): Promise<any>;
      getAddress(jwk: any): Promise<string>;
      getBalance(address: string): Promise<string>;
      sign(jwk: any, data: any): Promise<any>;
    };
    transactions: {
      get(id: string): Promise<any>;
      post(tx: any): Promise<any>;
      sign(tx: any): Promise<any>;
    };
    // 其他您需要的类型声明
    api: any;
    createTransaction: any;
  }

  export = Arweave;
}
