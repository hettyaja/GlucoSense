import React, { useState } from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Text, View } from 'react-native';

const PopupMenu = ({type, onAdd, onEdit, onDelete, onDisplayAll, onGlucose, onMeal, onMedicine, onToday, on3D, on7D, on30D, color, setDefault }) => {
  const getDefaultOption = () => {
    if (type === 'home') {
      return 'Display all';
    } else if (type === 'glucoseFilter') {
      return 'Today'
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
          {['more-vertical', 'Add', 'Edit', 'Delete', 'Set as Default'].includes(selectedOption) ? (
            <Feather name='more-vertical' size={24} />
          ) : (
            <>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14, paddingRight:8, color}}>{selectedOption}</Text>
                <AntDesign name='caretdown' size={8} color={color} />
            </>
          )}
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        {onAdd && <MenuOption onSelect={() => handleSelect(onAdd, 'Add')} text='Add' />}
        {onEdit && <MenuOption onSelect={() => handleSelect(onEdit, 'Edit')} text='Edit' />}
        {onDelete && <MenuOption onSelect={() => handleSelect(onDelete, 'Delete')} text='Delete' />}
        {setDefault && <MenuOption onSelect={() => handleSelect(setDefault, 'Set as Default')} text='Set as Default' />}
        {onDisplayAll && <MenuOption onSelect={() => handleSelect(onDisplayAll, 'Display all')} text='Display all' />}
        {onGlucose && <MenuOption onSelect={() => handleSelect(onGlucose, 'Glucose')} text='Glucose' />}
        {onMeal && <MenuOption onSelect={() => handleSelect(onMeal, 'Meal')} text='Meal' />}
        {onMedicine && <MenuOption onSelect={() => handleSelect(onMedicine, 'Medicine')} text='Medicine' />}
        {onToday && <MenuOption onSelect={() => handleSelect(onToday, 'Today')} text='Today' />}
        {on3D && <MenuOption onSelect={() => handleSelect(on3D, '3D')} text='3D' />}
        {on7D && <MenuOption onSelect={() => handleSelect(on7D, '7D')} text='7D' />}
        {on30D && <MenuOption onSelect={() => handleSelect(on30D, '30D')} text='30D' />}
        
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
