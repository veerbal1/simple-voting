use anchor_lang::prelude::*;

declare_id!("F4Qg3dUpyJDAiTABSDADnehcH5MdGwkZfREohwafYGxw");

#[program]
pub mod simple_voting {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
