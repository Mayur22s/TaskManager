import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';

import { stacks } from './stack';
import AddEditTask from '../screens/AddEditTask';
import Tasks from '../screens/Task';

const Stack = createNativeStackNavigator<stacks>();
const AppNavigator: FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Tasks'>
                <Stack.Screen name="Tasks" component={Tasks} />
                <Stack.Screen name="AddEditTask" component={AddEditTask} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator