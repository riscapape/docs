---
id: 04-4-cryptographic-primitives-proof-integration
sidebar_position: 4
title: "4. Cryptographic Primitives & Proof Integration"
slug: cryptographic-primitives-proof-integration
---

## 4.1 Proofs for Identity and Payments

P2P Protocol uses ZK proofs to validate transactions and identity data records. Besides facilitating anonymous transactions and dispute resolutions within the community, these ZK proofs help authenticate critical user activity on the Protocol.

A new member can perform trustless KYC by sharing just a ZK proof of their identity document. This not only keeps their identification incognito but also bolsters their on-chain reputation and transaction limit without revealing raw PII on-chain.

## 4.2 TLS-Backed Evidence

To achieve maximum privacy, proofs harness the TLS layer of web sessions (e.g., TLS 1.2/1.3) so that a user or merchant can produce a cryptographic witness that a specific statement about a bank transfer page, PSP receipt, or KYC provider result is true, without exposing credentials or page contents.

The **Reclaim Protocol** [1] enables the generation, storage, and dissemination of ZK-proofs of transactions using a single unified protocol. Users can share fully encrypted proofs of their fiat money transfers to cash out stablecoins via the smart contract.

**Important:** The Protocol specifies where proofs are verified:

- **On-chain verifier** for compact claims and attestation hashes.
- **Off-chain verifier/relayer** (open-source reference) for complex or rail-specific statements, posting a succinct attestation back on-chain.

> Raw proofs may remain with users; the chain stores minimal commitments and verdicts. The ZK proofs are stored securely as on-chain credentials—a feat made possible by Reclaim.

## 4.3 Privacy Properties

- **Non-interactive disclosure:** share only the proof, not the underlying data.
- **Selective reveal:** only fields required by the verification circuit are exposed to the circuit.
- **Bounded linkage:** protocol IDs and commitments minimize cross-session linkability where feasible.

---