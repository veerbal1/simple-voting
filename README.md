# Simple Voting DApp - Day 2

> A beginner-friendly Solana program built with Anchor Framework for learning blockchain development

## 📚 What is This Project?

This is a simple voting application built on the Solana blockchain using the Anchor framework. It demonstrates fundamental concepts of Solana program development, including:

- **Account initialization** 
- **State management**
- **Transaction signing**
- **Error handling**
- **Testing with TypeScript**

The program allows users to vote for one of two options (A or B), with built-in protection against double voting.

---

## 🏗️ Project Structure

```
simple-voting/
├── programs/
│   └── simple-voting/
│       └── src/
│           └── lib.rs          # Main Solana program (Rust)
├── tests/
│   └── simple-voting.ts        # Test suite (TypeScript)
├── target/
│   ├── idl/
│   │   └── simple_voting.json  # Interface Definition Language
│   └── deploy/
│       └── simple_voting.so    # Compiled program
└── Anchor.toml                 # Anchor configuration
```

---

## 🧠 How It Works

### Program Functions

#### 1. `initialize()`
Creates a new voting account with initial state:
```rust
option_a: false
option_b: false
has_voted: false
```

#### 2. `vote_option_a()`
- Records a vote for Option A
- Sets `has_voted` to `true` to prevent double voting
- Returns error if user already voted

#### 3. `vote_option_b()`
- Records a vote for Option B
- Sets `has_voted` to `true` to prevent double voting
- Returns error if user already voted

### Data Structure

```rust
pub struct Vote {
    option_a: bool,   // Did they vote for A?
    option_b: bool,   // Did they vote for B?
    has_voted: bool,  // Have they voted at all?
}
```

**Account Space**: `8 + 3` bytes
- 8 bytes: Account discriminator (Anchor adds this automatically)
- 3 bytes: Three boolean fields (1 byte each)

---

## 🚀 Getting Started

### Prerequisites

- **Rust** (1.70+)
- **Solana CLI** (1.18+)
- **Anchor** (0.29+)
- **Node.js** (16+)
- **Yarn** package manager

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd simple-voting
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Build the program**
   ```bash
   anchor build
   ```

4. **Run tests**
   ```bash
   anchor test
   ```

---

## 🧪 Running Tests

The test suite covers four scenarios:

```bash
anchor test
```

**Test Cases:**
1. ✅ Initialize a voting account
2. ✅ Vote for Option A
3. ✅ Vote for Option B (with new account)
4. ✅ Prevent double voting (error handling)

### Expected Output
```
  simple-voting
    ✓ Is initialized!
    ✓ Can vote for option A
    ✓ Can vote for option B
    ✓ Cannot vote again

  4 passing
```

---

## 🔍 Key Learning Points

### 1. **Account Initialization**
```rust
#[account(init, payer = user, space = 8 + 3)]
pub vote: Account<'info, Vote>,
```
- `init`: Create new account
- `payer`: Who pays for rent
- `space`: Size in bytes

### 2. **Require Statements**
```rust
require!(!voting_account.has_voted, ErrorCode::AlreadyVoted);
```
Ensures users can only vote once. If condition fails, returns custom error.

### 3. **Context Structs**
```rust
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 3)]
    pub vote: Account<'info, Vote>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```
Defines which accounts are needed for each instruction.

### 4. **Error Handling**
```rust
#[error_code]
pub enum ErrorCode {
    #[msg("You have already voted")]
    AlreadyVoted,
}
```
Custom error messages improve user experience and debugging.

---

## 📝 Program Address

**Program ID**: `F4Qg3dUpyJDAiTABSDADnehcH5MdGwkZfREohwafYGxw`

This unique identifier is generated when you first build the program. It's used to:
- Deploy the program to the blockchain
- Reference the program in client applications
- Verify on-chain execution

---

## 🛠️ Common Commands

```bash
# Build the program
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Clean build artifacts
anchor clean
```

---

## 📊 Account Rent

Solana requires accounts to maintain a minimum balance (rent). This program:
- Uses 11 bytes of storage (8 + 3)
- Requires ~0.00089088 SOL rent-exempt balance
- Rent is paid by the `payer` account during initialization

---

## 🔐 Security Considerations

### Current Implementation
- ✅ Prevents double voting
- ✅ Requires transaction signature
- ✅ Account ownership validation (Anchor handles this)

### Limitations (Learning Context)
- ⚠️ No vote tallying mechanism
- ⚠️ Each voter needs their own account (not scalable)
- ⚠️ No time-based voting periods
- ⚠️ No vote delegation

---

## 📚 Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Developer Guide](https://solana.com/developers)
- [Anchor by Example](https://examples.anchor-lang.com/)

---

## 🐛 Troubleshooting

### "insufficient funds for rent"
Your wallet needs SOL for transaction fees and rent. Get devnet SOL:
```bash
solana airdrop 2 --url devnet
```

### "Program failed to compile"
Ensure you have the correct Rust and Solana versions:
```bash
rustc --version    # Should be 1.70+
solana --version   # Should be 1.18+
anchor --version   # Should be 0.29+
```

### Tests timeout
Increase timeout in `Anchor.toml`:
```toml
[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```

---

## 📄 License

This is a learning project. Feel free to use, modify, and learn from it!

---

## 👨‍💻 Development Log

**Day 2**: Created simple voting program with:
- Initialize, vote_option_a, and vote_option_b functions
- Double voting prevention
- Complete test coverage
- Understanding of Anchor accounts and error handling

---

**Happy Learning! 🚀**

