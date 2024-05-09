import { defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins'
import { hardhat } from '@wagmi/cli/plugins'
import { react } from '@wagmi/cli/plugins'
import { actions } from '@wagmi/cli/plugins'


export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    hardhat({
      project: '../chain',
      include: [
        'ComponentRegistry.sol/**',
        'D7.sol/**',
        'Game.sol/**',
        'GameFactory.sol/**',
        'IGame.sol/**',
        'IComponent.sol/**',
        'QueueSession.sol/**',
        'RockPaperScissors.sol/**',
        'RewardERC20.sol/**',
      ],
    }),
    react(),
    actions()
  ],
});
