import React from 'react'
import Select from 'react-select'

const defaultValue = (options, value) => options ? options.find((option) => option.value === value) : ''


const CustomSelect = ({onChange, options, value, className}) => {
    return (
        <div className={className}>
            <Select
                options={options}
                onChange={value => onChange(value)}
                value={defaultValue(options, value)}
            />
        </div>
    )
}

export default CustomSelect