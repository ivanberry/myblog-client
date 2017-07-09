import React from 'react';
import './FormErrors.css';

//show all invalid infomations
const FormErrors = (props) => {
    return (
        <div>
            <ul className="validate-list">
                {
                    //eslint-disable-next-line
                    props.formRules.map((rule) => {
                        if (rule.field === 'username') {
                            if (props.formType === 'register') {
                                return <li className={rule.valid ? 'success' : 'error'} key={rule.id}>{rule.name}</li>
                            }
                        } else {
                            return <li className={rule.valid ? 'success' : 'error'} key={rule.id}>{rule.name}</li>
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default FormErrors;