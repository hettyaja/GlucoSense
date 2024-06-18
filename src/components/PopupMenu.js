import React, { useState } from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Text, View } from 'react-native';

const PopupMenu = ({type, onAdd, onEdit, onDelete, onDisplayAll, onGlucose, onMeal, onMedicine }) => {
  const getDefaultOption = () => {
    if (type === 'home') {
      return 'Display all';
    }
    return 'more-vertical';
  };

  const [selectedOption, setSelectedOption] = useState(getDefaultOption);

  const handleSelect = (callback, option) => {
    setSelectedOption(option);
    if (callback) callback();
  };

  return (
    <Menu>
      <MenuTrigger>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {['more-vertical', 'Add', 'Edit', 'Delete'].includes(selectedOption) ? (
            <Feather name='more-vertical' size={24} />
          ) : (
            <>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, paddingRight:8 }}>{selectedOption}</Text>
                <AntDesign name='caretdown' size={8} color='black' />
            </>
          )}
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        {onAdd && <MenuOption onSelect={() => handleSelect(onAdd, 'Add')} text='Add' />}
        {onEdit && <MenuOption onSelect={() => handleSelect(onEdit, 'Edit')} text='Edit' />}
        {onDelete && <MenuOption onSelect={() => handleSelect(onDelete, 'Delete')} text='Delete' />}
        {onDisplayAll && <MenuOption onSelect={() => handleSelect(onDisplayAll, 'Display all')} text='Display all' />}
        {onGlucose && <MenuOption onSelect={() => handleSelect(onGlucose, 'Glucose')} text='Glucose' />}
        {onMeal && <MenuOption onSelect={() => handleSelect(onMeal, 'Meal')} text='Meal' />}
        {onMedicine && <MenuOption onSelect={() => handleSelect(onMedicine, 'Medicine')} text='Medicine' />}
      </MenuOptions>
    </Menu>
  );
};

export default PopupMenu;

const optionsStyles = {
  optionsContainer: {
    borderRadius: 16,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    padding: 8,
  },
};
