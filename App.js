import React, { useEffect, useState } from 'react';
import {
  View, Text, ActivityIndicator,
  StatusBar, StyleSheet, Platform,
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { initDB } from './src/database';
import { C, FONTS } from './src/components';

import DashboardScreen from './screens/DashboardScreen';
import GymScreen       from './screens/GymScreen';
import RoutinesScreen  from './screens/RoutinesScreen';
import WaterScreen     from './screens/WaterScreen';
import FinanceScreen   from './screens/FinanceScreen';
import NotesScreen     from './screens/NotesScreen';

const Tab = createBottomTabNavigator();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: C.bg,
    card:        '#040404',
    border:      '#181818',
    text:        C.textPrim,
    primary:     C.accent,
  },
};

const TABS = [
  { name: 'Dashboard', title: 'Bugün',    icon: '🏠', Screen: DashboardScreen },
  { name: 'Gym',       title: 'Gym',      icon: '🏋️',  Screen: GymScreen      },
  { name: 'Routines',  title: 'Rutin',    icon: '🔥', Screen: RoutinesScreen  },
  { name: 'Water',     title: 'Su',       icon: '💧', Screen: WaterScreen     },
  { name: 'Finance',   title: 'Bütçe',    icon: '💰', Screen: FinanceScreen   },
  { name: 'Notes',     title: 'Notlar',   icon: '📝', Screen: NotesScreen     },
];

function TabIcon({ focused, icon, label }) {
  return (
    <View style={styles.tabItem}>
      {focused && <View style={styles.tabGlow} />}
      <Text style={[styles.tabIcon, !focused && styles.tabIconInactive]}>{icon}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
      {focused && <View style={styles.tabDot} />}
    </View>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      initDB();
      setReady(true);
    } catch (e) {
      console.error('DB init error:', e);
      setError(e.message);
    }
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        <Text style={{ color: C.red, textAlign: 'center', padding: 24, fontSize: FONTS.md }}>
          Veritabanı başlatılamadı:{'\n\n'}{error}
        </Text>
      </SafeAreaView>
    );
  }

  if (!ready) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        <Text style={styles.loadingLogo}>✦</Text>
        <ActivityIndicator size="large" color={C.accent} style={{ marginTop: 24 }} />
        <Text style={styles.loadingText}>RitmNox başlatılıyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} translucent={false} />
      <NavigationContainer theme={NavTheme}>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#040404',
              borderBottomWidth: 1,
              borderBottomColor: '#181818',
              elevation: 0,
              shadowOpacity: 0,
              height: Platform.OS === 'ios' ? 96 : 56,
            },
            headerTitleStyle: {
              color: C.textPrim,
              fontWeight: '800',
              fontSize: FONTS.lg,
              letterSpacing: 0.3,
            },
            headerTintColor: C.textPrim,
            tabBarStyle: {
              backgroundColor: '#040404',
              borderTopWidth: 1,
              borderTopColor: '#181818',
              height: Platform.OS === 'ios' ? 82 : 68,
              paddingBottom: Platform.OS === 'ios' ? 20 : 10,
              paddingTop: 4,
              elevation: 24,
              shadowColor: '#000',
              shadowOpacity: 0.8,
              shadowRadius: 16,
            },
            tabBarShowLabel: false,
          }}
        >
          {TABS.map(t => (
            <Tab.Screen
              key={t.name}
              name={t.name}
              component={t.Screen}
              options={{
                title: t.title,
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} icon={t.icon} label={t.title} />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, backgroundColor: C.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  loadingLogo: {
    color: C.accent, fontSize: 52, fontWeight: '900',
    textShadowColor: C.accent, textShadowRadius: 20,
  },
  loadingText: { color: C.textSec, marginTop: 16, fontSize: FONTS.sm },

  tabItem: {
    alignItems: 'center', justifyContent: 'center',
    paddingTop: 4, minWidth: 44, gap: 2, position: 'relative',
  },
  tabGlow: {
    position: 'absolute',
    top: -4, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,229,255,0.06)',
  },
  tabIcon:         { fontSize: 20 },
  tabIconInactive: { opacity: 0.35 },
  tabLabel:        { fontSize: 9, color: C.textMuted, fontWeight: '600' },
  tabLabelActive:  { color: C.accent, fontWeight: '700' },
  tabDot: {
    position: 'absolute', top: -8,
    width: 24, height: 2.5, borderRadius: 99,
    backgroundColor: C.accent,
    shadowColor: C.accent, shadowOpacity: 1, shadowRadius: 6, elevation: 6,
  },
});
