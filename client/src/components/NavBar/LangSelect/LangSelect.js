import React from 'react'
import Select from 'react-select'

import './LangSelect.scss'

const defaultValue = (options, value) => options ? options.find((option) => option.value === value) : ''

const LangSelect = ({onChange, options, value, className, ...rest}) => {
   
    return (
        <div className={className}>
            <Select
                classNamePrefix={'langSelect'}
                options={options}
                onChange={value => onChange(value)}
                value={defaultValue(options, value)}
                {...rest}
            />
        </div>
    )
}

export default LangSelect