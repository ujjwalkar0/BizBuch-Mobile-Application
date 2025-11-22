// src/presentation/screens/HomeScreen.tsx
import React from 'react';
import { Provider, BottomNavigation } from 'react-native-paper';
import { TabIcon } from '../components/TabIcon';
import { TAB_ROUTES } from '../navigation/TabRoutes';

const HomeScreen: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const routes = TAB_ROUTES.map(({ key, title, icon }) => ({ key, title, icon }));

  const renderScene = BottomNavigation.SceneMap(
    Object.fromEntries(
      TAB_ROUTES.map((r) => [
        r.key,
        () => <r.component />,
      ])
    )
  );

  return (
    <Provider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting
        labeled
        barStyle={{ backgroundColor: '#fff' }}
        activeColor="tomato"
        inactiveColor="gray"
        renderIcon={({ route, focused, color }) => (
          <TabIcon icon={route.icon} color={color} size={focused ? 28 : 22} />
        )}
      />
    </Provider>
  );
};

export default HomeScreen;
