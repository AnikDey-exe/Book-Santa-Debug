import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SettingsScreen from '../screens/SettingsScreen';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import MyDonationsScreen from '../screens/MyDonationsScreen'

export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: AppTabNavigator
        },

        MyDonations: {
            screen: MyDonationsScreen,
        },

        Settings: {
            screen: SettingsScreen
        }
    },

    {
        contentComponent:  CustomSideBarMenu
    },

    {
        InitialRouteName: 'Home'
    }
);