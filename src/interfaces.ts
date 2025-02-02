/* eslint-disable @typescript-eslint/no-unused-vars */
import { availableVCStores } from './veramo/plugins/availableVCStores';
import { IIdentifier, IKey, VerifiableCredential } from '@veramo/core';
import { ManagedPrivateKey } from '@veramo/key-manager';
import {
  SnapDIDStore,
  SnapKeyStore,
  SnapVCStore,
  SnapPrivateKeyStore,
} from './veramo/plugins/snapDataStore/snapDataStore';
import { availableMethods } from './did/didMethods';

export type SSISnapState = {
  /**
   * Account specific storage
   */
  accountState: Record<string, SSIAccountState>;

  /**
   * Configuration for SSISnap
   */
  snapConfig: SSISnapConfig;
};

export type ExtendedVerifiableCredential = VerifiableCredential & {
  /**
   * key for dictionary
   */
  key: string;
};

/**
 * Ceramic Network storedVCs
 */
export interface StoredCredentials {
  storedCredentials: Array<ExtendedVerifiableCredential>;
}

export interface SSISnapConfig {
  snap: {
    /**
     * Infura token, used by Veramo agent.
     */
    infuraToken: string;
    acceptedTerms: boolean;
  };
  dApp: {
    disablePopups: boolean;
    friendlyDapps: Array<string>;
  };
}

/**
 * SSI Snap State for a MetaMask address
 */
export interface SSIAccountState {
  /**
   * Store for {@link SnapPrivateKeyStore}
   */
  snapPrivateKeyStore: Record<string, ManagedPrivateKey>;
  /**
   * Store for {@link SnapKeyStore}
   */
  snapKeyStore: Record<string, IKey>;
  /**
   * Store for {@link SnapDIDStore}
   */
  identifiers: Record<string, IIdentifier>;
  /**
   * Store for {@link SnapVCStore}
   */
  vcs: Record<string, VerifiableCredential>;

  publicKey: string;
  accountConfig: SSIAccountConfig;
}

export interface SSIAccountConfig {
  ssi: {
    didMethod: typeof availableMethods[number];
    vcStore: typeof availableVCStores[number];
  };
}

export type SnapConfirmParams = {
  prompt: string;
  description?: string;
  textAreaContent?: string;
};
