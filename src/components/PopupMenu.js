import React from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Feather from 'react-native-vector-icons/Feather';

const PopupMenu = ({ onAdd, onEdit, onDelete }) => {
  return (
    <Menu>
      <MenuTrigger>
        <Feather name='more-vertical' size={24}/>
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        {onAdd && <MenuOption onSelect={onAdd} text='Add' />}
        {onEdit && <MenuOption onSelect={onEdit} text='Edit'/>}
        {onDelete && <MenuOption onSelect={onDelete} text='Delete' />}
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