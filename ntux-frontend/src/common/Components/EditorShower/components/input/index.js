/* eslint-disable react/prop-types */
import React from 'react';
import styles from './styles.module.scss';

const Input = ({ formId, id, type, label, required, value, setValue }) => {
  return (
    <div className={styles.inputWrapper}>
      <label form={formId} htmlFor={id}>
        {label}
      </label>
      <input
        form={formId}
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled
      />
    </div>
  );
};

export default Input;
