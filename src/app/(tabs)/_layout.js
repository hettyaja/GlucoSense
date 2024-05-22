import { useState } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Modal, Dimensions, handleTabPress } from 'react-native';
import { Tabs } from 'expo-router';
import { router } from 'expo-router';
import { images } from '../../constants/images';
import ImageButton from '../../components/ImageButton';

const TabIcon = ({ icon, size }) => {
  return (
    <View>
      <Image
        source={icon}
        style={{ width: size, height: size }}
      />
    </View>
  );
};

const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: -30, justifyContent: 'center', alignItems: 'center' }}
    onPress={onPress}
  >
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#ff6347',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

const _layout = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarButton: (props) => {
            if (route.name === 'add') {
              return <CustomTabButton {...props} onPress={() => setModalVisible(true)}>{props.children}</CustomTabButton>;
            }
            return <TouchableOpacity {...props} onPress={() => handleTabPress(route)} />;
          },
        })}
      >
        <Tabs.Screen name='home' options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon={images.home} size={size} />
          ),
        }} />
        <Tabs.Screen name='insight' options={{
          title: 'Insight',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon={images.insight} size={size} />
          ),
        }} />
        <Tabs.Screen name='add' options={{
          title: 'Add',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon={images.add} size={size} />
          ),
        }} />
        <Tabs.Screen name='food' options={{
          title: 'Food',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon={images.food} size={size} />
          ),
        }} />
        <Tabs.Screen name='setting' options={{
          title: 'Setting',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
          headerLeft: () => (
            <ImageButton
              source={require("../../assets/back.png")}
              imageSize={{ width: 24, height: 24 }}
              customStyle={{ paddingLeft: 10 }}
              onPress={() => router.back('/registerPage')}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.button}>
              <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-Regular', fontSize: 14, color: 'white' }}>Upgrade</Text>
            </TouchableOpacity>
          ),
          headerTitle: 'Setting',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon={images.more} size={size} />
          ),
        }} />
      </Tabs>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Diary</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity style={styles.option}>
                <Text>Glucose</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text>Meals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text>Meds</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default _layout;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    height: height / 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  option: {
    alignItems: 'center',
    padding: 10,
  },
});
