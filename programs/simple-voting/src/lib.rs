use anchor_lang::prelude::*;

declare_id!("F4Qg3dUpyJDAiTABSDADnehcH5MdGwkZfREohwafYGxw");

#[error_code]
pub enum ErrorCode {
    #[msg("You have already voted")]
    AlreadyVoted,
}

#[program]
pub mod simple_voting {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let voting_account = &mut ctx.accounts.vote;
        voting_account.option_a = false;
        voting_account.option_b = false;
        voting_account.has_voted = false;
        Ok(())
    }

    pub fn vote_option_a(ctx: Context<Voting>) -> Result<()> {
        let voting_account = &mut ctx.accounts.vote;
        require!(!voting_account.has_voted, ErrorCode::AlreadyVoted);
        voting_account.option_a = true;
        voting_account.option_b = false;
        voting_account.has_voted = true;
        Ok(())
    }

    pub fn vote_option_b(ctx: Context<Voting>) -> Result<()> {
        let voting_account = &mut ctx.accounts.vote;
        require!(!voting_account.has_voted, ErrorCode::AlreadyVoted);
        voting_account.option_a = false;
        voting_account.option_b = true;
        voting_account.has_voted = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 3)]
    pub vote: Account<'info, Vote>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Voting<'info> {
    #[account(mut)]
    pub vote: Account<'info, Vote>,
    pub user: Signer<'info>,
}

#[account]
pub struct Vote {
    option_a: bool,
    option_b: bool,
    has_voted: bool,
}
