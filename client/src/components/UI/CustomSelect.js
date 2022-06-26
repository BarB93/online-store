import React from 'react'
import Select from 'react-select'

const defaultValue = (options, value) => options ? options.find((option) => option.value === value) : ''


const CustomSelect = ({onChange, options, value, className, ...rest}) => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? '1px solid #000' : '1px solid hsl(0deg, 0%, 80%)',
            boxShadow: state.isFocused ?  '0 0 0 1px #000' : 'none',
            cursor: 'pointer',
            '&:hover': {
                border: state.isFocused ? '1px solid #000' : '1px solid hsl(0deg, 0%, 70%)',
            },
        })
    }

    return (
        <div className={className}>
            <Select
                styles={customStyles}
                options={options}
                onChange={value => onChange(value)}
                value={defaultValue(options, value)}
                {...rest}
            />
        </div>
    )
}

export default CustomSelect