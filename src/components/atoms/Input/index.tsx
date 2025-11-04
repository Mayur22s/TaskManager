import React, { FC } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
}

const Input: FC<InputProps> = ({
    value,
    placeholder,
    onChangeText,
}) => {
    return (
        <View style={{
            borderWidth: 1,
            marginVertical: 10,
            borderRadius: 8
        }}>

            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export default Input