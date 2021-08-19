import React from 'react'
import { Field, useFormikContext, ErrorMessage } from 'formik'
import { Form } from 'react-bootstrap'

export default ({ label, name, type, component = Field }) => {
    const { errors, touched } = useFormikContext()
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                type={type}
                as={component}
                isValid={touched[name] && !errors[name]}
                isInvalid={touched[name] && errors[name]}
            />
            <ErrorMessage name={name} component={Form.Control.Feedback} />
        </Form.Group>
    )
}
