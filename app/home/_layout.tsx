import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    header: ({ navigation }) => (
                        <View style={styles.searchBar}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => navigation.openDrawer()}
                            >
                                <Icon name="menu" size={30} color="#000" />
                            </TouchableOpacity>

                            <TextInput
                                placeholder="Search your notes"
                                style={styles.searchInput}
                            />

                            <TouchableOpacity style={styles.iconButton}>
                                <Icon name="account-circle" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    ),
                    drawerStyle: {
                        backgroundColor: '#fff',
                    },
                    drawerLabelStyle: {
                        marginLeft: 10,
                    },
                    drawerActiveTintColor: '#1a73e8',
                    drawerInactiveTintColor: '#202124',
                }}
            >
                <Drawer.Screen
                    name="homePage"  // This should be "index" instead of "homePage"
                    options={{
                        drawerLabel: "Home",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="notes"
                    options={{
                        drawerLabel: "Notes",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="note" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="reminders"
                    options={{
                        drawerLabel: "Reminders",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="notifications" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="createNewLabel"
                    options={{
                        drawerLabel: "Create new label",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="add" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="archive"
                    options={{
                        drawerLabel: "Archive",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="archive" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="trash"
                    options={{
                        drawerLabel: "Trash",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="delete" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: "Settings",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="settings" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="helpFeedback"
                    options={{
                        drawerLabel: "Help & feedback",
                        drawerIcon: ({ color, size }) => (
                            <Icon name="help" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        marginTop: 30,
        backgroundColor: "#b3ccf5",
        marginHorizontal: 10,
        borderRadius: 35,
    },
    iconButton: {
        padding: 10,
    },
    searchInput: {
        backgroundColor: "#b3ccf5",
        padding: 10,
        flex: 1,
        marginHorizontal: 10,
    },
});
