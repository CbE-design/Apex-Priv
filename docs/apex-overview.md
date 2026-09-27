# Apex — Current Product and Technical Overview

**Audit basis:** repository state on branch `replit-agent`, reviewed September 27, 2026.

## 1. What Apex is

Apex is a crypto wallet and digital-asset operations platform built around an Apex account, an EVM wallet identity, an internal multi-asset ledger, and a controlled path to external blockchain settlement.

The product combines three layers:

1. **A consumer wallet experience** for viewing assets, prices, portfolio value, transactions, sending and receiving funds, swapping, cashing out, buying digital goods, and getting crypto/support assistance.
2. **An internal Apex ledger** where balances and transactions are stored in Firestore and where Apex-to-Apex transfers settle instantly inside the platform.
3. **An on-chain settlement layer** that can settle APEX externally to an EVM wallet on Base using a treasury-controlled signer. The current external settlement implementation is explicitly limited to APEX.

In plain language, Apex is currently closer to a managed wallet and financial operations platform than a fully non-custodial wallet. The user-facing wallet identity is EVM-compatible, but the application maintains balances in Firestore and the server controls the treasury used for external APEX settlement.

## 2. Main user experience

### Authentication and wallet onboarding

Users sign in by connecting to a wallet identity rather than using a conventional password-first account. The app sends the wallet address to `/api/auth/wallet-token`; the server resolves an existing Firebase user or derives a deterministic wallet-based Firebase UID, then issues a Firebase custom token.

The client stores and restores wallet material locally. The wallet context supports:

- Creating a new EVM wallet.
- Importing an existing wallet.
- A local encrypted vault protected by a PIN.
- Passkey registration and passkey unlock when supported by the browser.
- Session restoration and wallet disconnect.
- Optional collection of an email address for account communication.

Firebase Authentication is the session layer. Firebase Firestore is the profile, balance, transaction, KYC, notification, and withdrawal data layer.

### Dashboard

The main dashboard is a protected portfolio workspace. It contains:

- KPI summary metrics.
- Portfolio balances and values.
- Market prices and 24-hour changes.
- Transaction history.
- Price alerts.
- Quick actions for common wallet operations.

Prices are fetched from CoinGecko where symbols are mapped, cached for approximately 60 seconds, and backed by static fallback values when the external price service is unavailable. Stablecoins have fixed fallback pricing in the current route.

### Wallets and assets

The wallets area reads asset records from `users/{uid}/wallets`. The application initializes a wallet record for each configured market coin and tracks balances per asset symbol.

The product supports a broad display portfolio including assets such as BTC, ETH, LINK, SOL, BNB, USDT, USDC, DOGE, MATIC/POL, AVAX, DOT, UNI, ATOM, LTC, BCH, TRX, SHIB, TON, SUI, APT, OP, and ARB. The presence of an asset in the UI does not mean every asset currently has live on-chain settlement support.

The wallets page also has browser-wallet interoperability through MetaMask. It can switch networks, read live ERC-20 balances, and add USDT or APXD as watched assets. These live reads are supplementary to the Firestore balances used by the dashboard.

### Sending and receiving

Apex supports two distinct transfer concepts:

- **Internal Apex transfers:** a server API atomically debits one user balance, credits another user balance, and creates ledger entries for both parties. Recipients can be resolved by wallet address or email.
- **External on-chain transfer:** the current implemented route settles APEX to an external EVM address on Base. It reserves the user's internal APEX balance, broadcasts a treasury-signed token transfer, records the transaction hash and explorer URL, and either finalizes or returns the balance if the operation fails.

The distinction between internal ledger movement and public blockchain settlement is fundamental to the current product.

### Swap

The application contains a swap page and exchange-rate AI flow. The shared data model supports asset conversion and exchange rates, but the repository audit should not treat the presence of the page alone as proof of a fully on-chain exchange or liquidity venue. The current architecture is primarily ledger-driven.

### Cash out

Cash out is a bank-withdrawal workflow. A user submits crypto and fiat details plus EFT or SWIFT banking information. The server transaction reserves the crypto balance and creates a `withdrawal_requests` record with a reference such as `APX-...`.

The admin workflow can review, approve, reject, process, and complete withdrawal requests. Confirmation emails are sent on a best-effort basis. The flow is operationally closer to a managed payout request than to an instant decentralized off-ramp.

### KYC and compliance

Apex includes KYC submission and review functionality. Users can submit identity details and document/selfie uploads. The model supports OCR and face-match results, field matching, review status, rejection reasons, reviewer identity, and timestamps.

The platform also carries compliance metadata on transfers, including compliance IDs, travel-rule verification flags, protocol names, chain IDs, token addresses, and settlement modes. These fields create an audit trail, but the presence of a field should not be confused with a complete compliance program or external verification provider.

### Digital goods and support

The Bitrefill area is designed for purchases such as mobile, gift cards, or other digital goods. The app also includes:

- An AI crypto assistant.
- An AI support agent and support chat popover.
- Email and notification flows.
- Firebase Cloud Messaging-related notification support.
- Legal pages for terms, privacy, and risk disclosure.

## 3. Administration and operations

The protected admin area includes screens for:

- Overall administration dashboard.
- User management.
- KYC review.
- Withdrawal review.
- Direct sends.
- Email marketing.
- Notifications and notification center.
- Settings.
- Whale monitoring.
- APEX and Base treasury controls.

The admin experience is intended to operate the managed ledger, review user risk and identity status, manage communications, and control treasury-related activity.

## 4. Current technical architecture

### Front end

- Next.js App Router application.
- React and TypeScript.
- Tailwind CSS with shadcn/Radix-style UI components.
- Client providers for Firebase, wallet state, theme, currency, and notifications.
- Responsive desktop and mobile navigation.
- Ethers for wallet creation, address handling, and EVM/ERC-20 interaction.

### Identity and data

- Firebase Authentication for signed-in sessions.
- Firebase custom tokens for wallet-address-based sign-in.
- Firestore for profiles, wallets, transactions, withdrawals, KYC records, notifications, rates, and platform settings.
- Firebase Storage for uploaded KYC documents and other media.
- Firebase Admin SDK on server-side routes and actions.

### Server functionality

The app uses Next.js route handlers and server actions for:

- Wallet token issuance.
- Internal transfers.
- External on-chain transfers.
- Price and exchange-rate retrieval.
- KYC upload and verification operations.
- Transactional email.
- Notifications.
- Alchemy webhook processing.

### Blockchain layer

- APEX/APXD ERC-20 configuration is present.
- Base is the configured production chain for APXD-related operations.
- External APEX settlement uses a server-side treasury configuration and signer.
- USDT and APXD live balance reads are supported through RPC providers and MetaMask/browser wallet access.
- Solidity sources include `ApexDollar.sol` and `ApexCoin.sol`.

### AI layer

The repository includes Genkit flows for authentication assistance, chat, crypto assistance, exchange rates, email, notifications, and support. The configured AI implementation uses Google Gemini through Genkit. This is separate from the core wallet ledger and should be treated as an assistance/automation layer, not the source of financial truth.

## 5. Data model in practical terms

The central records are:

- `users/{uid}` — user profile, email, wallet address, KYC status, online state, and restriction fields.
- `users/{uid}/wallets/{SYMBOL}` — per-asset internal balance and sync metadata.
- `users/{uid}/transactions/{id}` — user-visible ledger entries.
- `withdrawal_requests/{id}` — bank cash-out requests and their lifecycle.
- `kyc_submissions/{id}` — identity verification submissions and review results.
- `notifications/{id}` and `broadcasts/{id}` — user and broadcast communications.
- `admin_notifications/{id}` — operational events for administrators.
- `onchain_transfers/{requestId}` — idempotent external APEX settlement state.
- `rates/{id}`, `platform_config/{id}`, and `protocol_settings/{id}` — platform and market configuration.

The important accounting pattern is reservation: a withdrawal or external transfer reduces available balance and increases a reserved amount before processing, then either finalizes or restores the balance.

## 6. Security and trust model as implemented

The strongest controls currently visible in the code are:

- Server-side verification of Firebase ID tokens for transfer APIs.
- Firestore transactions for internal transfers, withdrawal reservations, and on-chain transfer reservations.
- Idempotent external transfer request IDs.
- Account restriction checks for external settlement.
- Server-only treasury settlement configuration.
- Firestore ownership checks and admin checks in security rules.
- Local wallet vault encryption and PIN/passkey unlock flows.

The current trust model also has material risks:

1. Wallet private keys are handled by client-side wallet state and local browser storage. This creates a difficult recovery, device-loss, XSS, and account-support model.
2. Firestore wallet documents are the effective internal balance source for many flows. A balance in the app is not automatically proof of an equivalent on-chain asset.
3. Admin authorization is represented in multiple places, including email/address checks in the client and Firebase rule/server mechanisms. These must remain consistent and should be consolidated and audited.
4. Firestore rules allow owners to write their own wallet subcollection documents. That is appropriate only if all balance-changing operations are separately constrained or if the wallet documents are not trusted as financial truth. For a production financial ledger, client-write access to balances is a high-priority review item.
5. KYC and banking records are highly sensitive. Access, storage, retention, redaction, and audit logging require production compliance review beyond the UI and type definitions.
6. Price fallbacks and static market values are useful for resilience but must not be used as authoritative settlement pricing without explicit controls.
7. The ledger-sync service currently reports a generated state root rather than a cryptographic state root, so its state-root display should be considered operational placeholder data.

## 7. What Apex is not yet, based on this repository

Based on the audited code, Apex should not currently be described as:

- A fully decentralized exchange.
- A purely non-custodial wallet with no server-held signing authority.
- A universal on-chain wallet for every asset displayed in the portfolio.
- A bank or regulated financial institution by virtue of the application code alone.
- A proof that every Firestore balance is backed 1:1 on-chain.

The more accurate description is: **Apex is a managed digital-asset wallet and operations platform that combines wallet-based identity, an internal Firestore ledger, compliance and cash-out workflows, and controlled on-chain APEX settlement on Base.**

## 8. Where Privy could benefit Apex

Privy could be valuable if Apex wants to simplify onboarding and move toward embedded-wallet infrastructure. The strongest potential benefits are:

- Embedded wallets for users who do not already have MetaMask or another wallet.
- Social, email, or phone onboarding alongside wallet login, if that product direction is desired.
- Better wallet creation, recovery, device portability, and wallet lifecycle management than a custom local encrypted-vault implementation.
- Cleaner support for multiple EVM wallets and wallet linking.
- A more standard authentication-to-wallet identity model.
- Less custom security-sensitive code in the wallet context.

Privy would not automatically solve Apex's biggest accounting problem. It would improve identity and wallet custody UX, but Apex would still need to decide whether balances are:

- On-chain user-owned balances.
- Custodial balances represented in an internal ledger.
- A hybrid where an internal ledger is periodically reconciled to treasury and chain state.

Privy also would not replace Firebase unless Apex intentionally migrated authentication and/or data architecture. A sensible evaluation would first map Privy to the current Firebase UID, wallet, and Firestore records, then decide whether Privy becomes the identity authority, the wallet provider, or both.

## 9. Recommended next decisions

1. Decide and document the custody model: non-custodial, custodial, or hybrid.
2. Make one ledger the authoritative accounting source and prohibit untrusted client balance writes.
3. Define the exact backing and settlement policy for every displayed asset.
4. Consolidate admin authorization into server-side claims/roles.
5. Add a formal reconciliation process between Firestore balances, treasury balances, and on-chain events.
6. Treat KYC, banking data, and withdrawal processing as a compliance-sensitive subsystem with retention and audit policies.
7. Evaluate Privy through a migration proof of concept focused on onboarding, wallet recovery, wallet linking, and mapping identities to existing Firebase/Firestore users.
8. Separate demo/fallback data from production financial data and label any unavailable or estimated values clearly.

## Executive summary

Apex is a crypto financial application with a polished wallet interface and a substantial operational backend. Users enter through a wallet identity, manage a portfolio of internal balances, view market data, transfer assets to other Apex users, request fiat withdrawals, complete KYC, and interact with support and AI tools. The platform can also settle APEX on-chain to Base through a treasury-controlled process.

Its defining architectural fact is the hybrid model: the user experience looks like a crypto wallet, while much of the value movement is currently an internal Firestore ledger, with selected APEX transactions settled publicly on-chain. Privy could strengthen wallet onboarding, recovery, and identity management, but the central product decision remains the custody and accounting model Apex wants to operate.
