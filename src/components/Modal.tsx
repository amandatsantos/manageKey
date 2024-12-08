import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

type ModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

const CustomModal = ({ visible, title, message, onClose }: ModalProps) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modal: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, marginBottom: 20 },
});

export default CustomModal;
