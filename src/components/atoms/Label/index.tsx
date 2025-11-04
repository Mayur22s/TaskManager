import React from 'react'
import { Text, TextStyle } from 'react-native'

interface LabelProps {
    title: string
    style?: TextStyle
}

const Label: React.FC<LabelProps> = ({
    title,
    style
}) => {
    return (
        <Text style={[{
        }, style]}>
            {title}
        </Text>
    )
}

export default Label