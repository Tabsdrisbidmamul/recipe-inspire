import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  onPressCancel: (...args: any) => any;
  onPressGrant: (...args: any) => any;
}
/**
 * permission card if the client has not approved camera access
 * @param props
 * @returns
 */
export default function PermissionsCard({ onPressCancel, onPressGrant }: IProps) {
  return (
    <View style={styles.permissionCard}>
      <Text style={[styles.text, { marginBottom: 20 }]}>We need your permission to show the camera</Text>
      <View style={styles.permissionCardButtonContainer}>
        <Pressable style={[styles.permissionButton, styles.cancel]} onPress={onPressCancel}>
          <Text style={[styles.text, styles.permissionText]}>Cancel</Text>
        </Pressable>

        <Pressable style={[styles.permissionButton, styles.success]} onPress={onPressGrant}>
          <Text style={[styles.text, styles.permissionText]}>Grant</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
    textAlign: 'center',
  },

  permissionCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingTop: 15,

    borderRadius: globalConstants.cardBorderRadius,
  },

  permissionCardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  permissionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
    padding: 10,
  },

  cancel: {
    backgroundColor: colors.primary.red,
    borderBottomLeftRadius: globalConstants.cardBorderRadius,
  },

  success: {
    backgroundColor: colors.primary.green,
    borderBottomRightRadius: globalConstants.cardBorderRadius,
  },

  permissionText: {
    color: colors.whites.pastel,
  },
});
