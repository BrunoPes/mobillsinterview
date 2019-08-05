import React from 'react';
import { Modal, StyleSheet, Dimensions } from 'react-native';
import { View, Spinner } from 'native-base';
const { height } = Dimensions.get('window');

const sizeModal = 80;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFF',
    alignSelf: 'center',
    width: sizeModal,
    height: sizeModal,
    marginTop: (height/2) - (sizeModal/2),
    elevation: 3,
    shadowColor: '#888',
    borderRadius: 5,
  }
});

const Loader = ({show}) => (
  <Modal visible={show} transparent>
    <View style={styles.modal}>
      <Spinner/>
    </View>
  </Modal>
);

export default Loader;