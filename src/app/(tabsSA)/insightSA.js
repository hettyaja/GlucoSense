import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext'

const insightSA = () => {
    const { logout } = useAuth()
    
    const handleSignOut = async () => {
        await logout()
      }

  return (
    <View>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  )
}

export default insightSA

const styles = StyleSheet.create({})