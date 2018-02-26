// flow-typed signature: a76fc4797b92c528b2d521ba3753bd43
// flow-typed version: <<STUB>>/js-nacl_vjs-nacl#6dc1417/flow_v0.65.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'js-nacl'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare type NaclKeyPair = {
	signPk: Uint8Array,
	signSk: Uint8Array,
};

declare export class NaclInstance {
	to_hex: (Uint8Array) => string,
	from_hex: (string) => Uint8Array,
	encode_utf8: (string) => Uint8Array,
	encode_latin1: (string) => Uint8Array,
	decode_utf8: (Uint8Array) => string,
	crypto_box: (
		ciphertextBin: Uint8Array,
		nonceBin: Uint8Array,
		senderPublicKeyBin: Uint8Array,
		recipientSecretKeyBin: Uint8Array,
	) => Uint8Array,
	crypto_box_open: (ciphertextBin: Uint8Array,
		nonceBin: Uint8Array,
		senderPublicKeyBin: Uint8Array,
		recipientSecretKeyBin: Uint8Array,
	) => Uint8Array,
	crypto_box_random_nonce: () => Uint8Array,
	crypto_hash_sha256: (Uint8Array) => Uint8Array,
	crypto_sign_seed_keypair: (Uint8Array) => NaclKeyPair,
	crypto_sign_detached: (msgBin: Uint8Array, signerSecretKey: Uint8Array) => Uint8Array,
	crypto_sign_BYTES: number,
	crypto_sign_verify_detached:
		(detachedSignatureBin: Uint8Array, msgBin: Uint8Array, signerPublicKey: Uint8Array)
			=> boolean,
}

declare module 'js-nacl' {
	declare module.exports: {
		instantiate((nacl: NaclInstance) => void): void,
	};
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'js-nacl/benchmark' {
  declare module.exports: any;
}

declare module 'js-nacl/lib/nacl_factory' {
  declare module.exports: any;
}

declare module 'js-nacl/nacl_cooked_prefix' {
  declare module.exports: any;
}

declare module 'js-nacl/nacl_cooked_suffix' {
  declare module.exports: any;
}

declare module 'js-nacl/nacl_cooked' {
  declare module.exports: any;
}

declare module 'js-nacl/test/tests' {
  declare module.exports: any;
}

// Filename aliases
declare module 'js-nacl/benchmark.js' {
  declare module.exports: $Exports<'js-nacl/benchmark'>;
}
declare module 'js-nacl/lib/nacl_factory.js' {
  declare module.exports: $Exports<'js-nacl/lib/nacl_factory'>;
}
declare module 'js-nacl/nacl_cooked_prefix.js' {
  declare module.exports: $Exports<'js-nacl/nacl_cooked_prefix'>;
}
declare module 'js-nacl/nacl_cooked_suffix.js' {
  declare module.exports: $Exports<'js-nacl/nacl_cooked_suffix'>;
}
declare module 'js-nacl/nacl_cooked.js' {
  declare module.exports: $Exports<'js-nacl/nacl_cooked'>;
}
declare module 'js-nacl/test/tests.js' {
  declare module.exports: $Exports<'js-nacl/test/tests'>;
}