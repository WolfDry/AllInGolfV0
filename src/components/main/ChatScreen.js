import { StyleSheet, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import globalStyles from '../../const/globalStyle';

export function ChatScreen() {

    return (
        <KeyboardAvoidingView style={[globalStyles.fullScreen, globalStyles.center]}>
            <ScrollView
                contentContainerStyle={[globalStyles.fullScreen, globalStyles.center]}
                bounces={false}>
                <Text style={[globalStyles.fullScreen, globalStyles.center]}>ChatScreen</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})