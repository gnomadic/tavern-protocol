'use client';

import DiscoverGames from '@/components/explore/ExploreGames';
import DiscoverComponents from '@/components/explore/ExploreComponents';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function ExploreTabs() {
    return (
        <Tabs>
            <TabList>
                <Tab>Games</Tab>
                <Tab>Components</Tab>
            </TabList>
            <TabPanel>
                <DiscoverGames />
            </TabPanel>
            <TabPanel>
                <DiscoverComponents />
            </TabPanel>
        </Tabs>
    )
}
