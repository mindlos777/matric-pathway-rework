const Stack =
  createNativeStackNavigator();

export default function OnboardingNavigator() {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />

      <Stack.Screen
        name="Name"
        component={NameScreen}
      />

      <Stack.Screen
        name="Hobbies"
        component={HobbiesScreen}
      />

      <Stack.Screen
        name="Province"
        component={ProvinceScreen}
      />

      <Stack.Screen
        name="Done"
        component={DoneScreen}
      />

    </Stack.Navigator>
  );
}