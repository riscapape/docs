---
id: 02-2-design-goals-and-non-goals
sidebar_position: 2
title: "2. Design Goals and Non-Goals"
slug: design-goals-and-non-goals
---

## 2.1 Goals

- Decentralized on/off-ramp between fiat and stablecoins without fiat escrow.
- Privacy by design using ZK proofs to authenticate identity data and fiat payment events while keeping raw data off-chain.
- Credible neutrality: protocol-level rules are open, transparent, and upgradable via governance.
- Fast settlement: typical completion within minutes, targeting sub-~90s for common rails as network, liquidity, and automation improve.
- Safety & integrity: explicit threat model, dispute flows, and rate/limit controls to minimize fraud.

## 2.2 Non-Goals

- The Protocol does not hold customer fiat or crypto in custody.
- The Protocol does not guarantee price or liquidity; it coordinates peers and market inputs.
- The Protocol does not "store proofs on behalf of users" by default; it verifies proofs and records necessary attestations on-chain while raw evidence can remain off-chain.

---