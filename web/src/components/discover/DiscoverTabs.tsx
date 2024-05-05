'use client';

import DiscoverGames from '@/components/discover/DiscoverGames';
import DiscoverComponents from '@/components/discover/DiscoverComponents';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function DiscoverTabs() {
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
