
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"

anchor test --skip-local-validator

avm install 0.28.0

export PATH="/home/gitpod/.local/share/solana/install/active_release/bin:$PATH"
anchor test