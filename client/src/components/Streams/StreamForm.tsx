import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = (props: any) => {
    const onSubmit = (formValues: any) => {
        props.onSubmit(formValues);
    }

    return (
        <form onSubmit={props.handleSubmit(onSubmit)} className='ui form error'>
            <Field name="title" component={renderInput} label="Enter Title"/>
            <Field name="description" component={renderInput} label="Enter Description"/>
            <button className='ui button primary'>Submit</button>
        </form>
    );
}

const renderError = (meta: any) => {
    if (meta.error && meta.touched) {
        return (
            <div className='ui error message'>
                <div className='header'>{meta.error}</div>
            </div>
        );
    }
}

const renderInput = (formProps: any) => {
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
    return (
        <div className={className}>
            <label>{formProps.label}</label>
            <input {...formProps.input} autoComplete="off" />
            <div>{renderError(formProps.meta)}</div>
        </div>
    ); 
}

const validate = (formValues: any) => {
    let errors = {
        title: '',
        description: ''
    }
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}


export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
