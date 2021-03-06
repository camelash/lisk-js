/*
 * Copyright © 2017 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import transferIntoDapp from 'transactions/6_transfer_into_dapp';
// Require is used for stubbing
const time = require('transactions/utils/time');

describe('#transferIntoDapp transaction', () => {
	const fixedPoint = 10 ** 8;
	const transactionType = 6;
	const dappId = '1234213';
	const passphrase = 'secret';
	const secondPassphrase = 'secondSecret';
	const publicKey =
		'5d036a858ce89f844491762eb89e2bfbd50a4a0a0da658e4b2628b25b117ae09';
	const amount = (10 * fixedPoint).toString();
	const transferFee = (0.1 * fixedPoint).toString();
	const timeWithOffset = 38350076;
	const offset = -10;

	let getTimeWithOffsetStub;
	let transferIntoDappTransaction;

	beforeEach(() => {
		getTimeWithOffsetStub = sandbox
			.stub(time, 'getTimeWithOffset')
			.returns(timeWithOffset);
		return Promise.resolve();
	});

	describe('with first passphrase', () => {
		beforeEach(() => {
			transferIntoDappTransaction = transferIntoDapp({
				dappId,
				amount,
				passphrase,
			});
			return Promise.resolve();
		});

		it('should create an inTransfer dapp transaction', () => {
			return expect(transferIntoDappTransaction).to.be.ok;
		});

		it('should use time.getTimeWithOffset to get the time for the timestamp', () => {
			return expect(getTimeWithOffsetStub).to.be.calledWithExactly(undefined);
		});

		it('should use time.getTimeWithOffset with an offset of -10 seconds to get the time for the timestamp', () => {
			transferIntoDapp({ dappId, amount, passphrase, timeOffset: offset });

			return expect(getTimeWithOffsetStub).to.be.calledWithExactly(offset);
		});

		describe('returned inTransfer transaction object', () => {
			it('should be an object', () => {
				return expect(transferIntoDappTransaction).to.be.an('object');
			});

			it('should have id string', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('id')
					.and.be.a('string');
			});

			it('should have type number equal to 6', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('type')
					.and.be.a('number')
					.and.equal(transactionType);
			});

			it('should have amount string equal to 10 LSK', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('amount')
					.and.be.a('string')
					.and.equal(amount);
			});

			it('should have fee string equal to 0.1 LSK', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('fee')
					.and.be.a('string')
					.and.equal(transferFee);
			});

			it('should have recipientId equal to null', () => {
				return expect(transferIntoDappTransaction).to.have.property(
					'recipientId',
				).be.null;
			});

			it('should have senderPublicKey hex string equal to sender public key', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('senderPublicKey')
					.and.be.hexString.and.equal(publicKey);
			});

			it('should have timestamp number equal to result of time.getTimeWithOffset', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('timestamp')
					.and.be.a('number')
					.and.equal(timeWithOffset);
			});

			it('should have signature hex string', () => {
				return expect(transferIntoDappTransaction).to.have.property('signature')
					.and.be.hexString;
			});

			it('should not have the second signature property', () => {
				return expect(transferIntoDappTransaction).not.to.have.property(
					'signSignature',
				);
			});

			it('should have an asset object', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('asset')
					.and.be.an('object');
			});

			describe('asset', () => {
				it('should have the in transfer dapp id', () => {
					return expect(transferIntoDappTransaction.asset)
						.to.have.property('inTransfer')
						.with.property('dappId')
						.and.be.equal(dappId);
				});
			});
		});
	});

	describe('with first and second passphrase', () => {
		beforeEach(() => {
			transferIntoDappTransaction = transferIntoDapp({
				dappId,
				amount,
				passphrase,
				secondPassphrase,
			});
			return Promise.resolve();
		});

		it('should have the second signature property as hex string', () => {
			return expect(transferIntoDappTransaction).to.have.property(
				'signSignature',
			).and.be.hexString;
		});
	});

	describe('unsigned transfer into dapp transaction', () => {
		describe('when the transfer into dapp transaction is created without a passphrase', () => {
			beforeEach(() => {
				transferIntoDappTransaction = transferIntoDapp({
					dappId,
					amount,
				});
				return Promise.resolve();
			});

			it('should have the type', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('type')
					.equal(transactionType);
			});

			it('should have the amount', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('amount')
					.equal(amount);
			});

			it('should have the fee', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('fee')
					.equal(transferFee);
			});

			it('should have the recipient id', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('recipientId')
					.equal(null);
			});

			it('should have the sender public key', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('senderPublicKey')
					.equal(null);
			});

			it('should have the timestamp', () => {
				return expect(transferIntoDappTransaction).to.have.property(
					'timestamp',
				);
			});

			it('should have the asset with the in transfer with the dappId', () => {
				return expect(transferIntoDappTransaction)
					.to.have.property('asset')
					.with.property('inTransfer')
					.with.property('dappId');
			});

			it('should not have the signature', () => {
				return expect(transferIntoDappTransaction).not.to.have.property(
					'signature',
				);
			});

			it('should not have the id', () => {
				return expect(transferIntoDappTransaction).not.to.have.property('id');
			});
		});
	});
});
