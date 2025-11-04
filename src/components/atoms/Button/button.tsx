import React, { FC } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import Label from '../Label'

interface ButtonProps {
    buttonName: string
    onPress: () => void,
    style?: ViewStyle
}
const Button: FC<ButtonProps> = ({
    buttonName,
    onPress,
    style,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[style, {
                borderRadius: 20,
                marginVertical: 10,
            }]}
        >
            <Label title={buttonName} />
        </TouchableOpacity>
    )
}

export default Button