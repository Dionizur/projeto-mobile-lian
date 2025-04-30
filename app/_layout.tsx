import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,  // Remover a barra superior (vsfd GPT)
        tabBarStyle: {
          display: 'none', // Remover a barra inferior completamente
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore copy"
        options={{
          title: 'Feriados',
          tabBarIcon: ({ color }) => <Ionicons name="ios-calendar-sharp" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
 