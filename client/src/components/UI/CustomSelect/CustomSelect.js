import React from 'react'
import Select from 'react-select'

import './CustomSelect.scss'

const defaultValue = (options, value) => options ? options.find((option) => option.value === value) : ''


const CustomSelect = ({onChange, options, value, className, ...rest}) => {
   
    return (
        <div className={className}>
            <Select
                classNamePrefix={'customSelect'}
                options={options}
                onChange={value => onChange(value)}
                value={defaultValue(options, value)}
                {...rest}
            />
        </div>
    )
}

export default CustomSelect