import { defineConfig } from '@wagmi/cli';
import { foundry } from '@wagmi/cli/plugins'
import { react } from '@wagmi/cli/plugins'
import { actions } from '@wagmi/cli/plugins'


export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    foundry({
      project: '../chain',
      include: [
        'ComponentRegistry.sol/**',
        'D7.sol/**',
        'Game.sol/**',
        'GameFactory.sol/**',
        'IGame.sol/**',
        'IComponent.sol/**',
      ],
    }),
    react(),
    actions()
  ],
});
