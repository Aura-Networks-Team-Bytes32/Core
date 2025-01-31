# Aura Network Overview 

- Fast and efficient card payments in the decentralized ecosystem, similar to traditional debit cards.
- Bridges the gap between DeFi and everyday card usage, making the experience seamless.

## How It's Made

### Phase 1: Debit Cards

#### User Onboarding and Proof-of-Personhood
- We use Lit Protocol to create a unique Programmable Key Pair (PKP) for each user.
- Worldcoin verifies users through proof-of-personhood using their Gmail accounts, ensuring secure access.

#### Transaction Signing and Automation
- The minted PKP automatically signs transactions via Lit Actions.
- Security is ensured with OTP (One-Time Password) authentication, linked to debit card details.

#### Transaction Execution and Recovery
- Transactions are processed on the Polygon network to reduce fees.
- Once a transaction is sent, we assume it's successful. If not, Blockless ensures validation and recovery through its off-chain consensus.

#### Ledger Management with Smart Contracts
- All fund transfers are managed by a smart contract, updating mappings like a traditional banking system.

---

# Upcoming Features

### Phase 2: Credit Scoring and Limit Allocation
- Chainlink DECO securely retrieves and verifies users’ credit scores while maintaining privacy.
- Credit limits are dynamically allocated based on users’ credit scores, offering greater flexibility.

### Phase 3: Asset-Based Credit Cards and Multi-Chain Asset Locking
- FD-Based Credit Card: Users can create a fixed deposit-backed credit card, securing credit while earning yields.
- Multi-Chain Asset Locking: Lock assets across multiple blockchains, aggregated and bridged to Polygon.
- Base Chain Credit Limit: Provides a credit limit based on locked assets, usable on the Polygon network.