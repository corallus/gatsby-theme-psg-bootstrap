import React from 'react'
import {Button, Form } from 'react-bootstrap'
import { Field, ErrorMessage } from 'formik'

import RenderCaptcha from "gatsby-theme-psg/src/components/ContactForm/recaptcha";
import privacyStatement from 'gatsby-theme-psg/src/assets/privacy-statement.pdf'

import FieldWrapper from './FieldWrapper'

import './style.css'

const TextAreaField = (props) => {
    return (
        <Field as="textarea" rows={6} {...props} />
    )
}

export const ResponseForm = (props) => {
    const {
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        setFieldValue,
        status
    } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <FieldWrapper id="naam" label="Naam" name="response.naam" type="text" />
            <FieldWrapper id="email" label="Email" name="response.email" type="email" />
            <FieldWrapper id="telefoonnummer" label="Telefoonnummer" name="response.telefoonnummer" type="tel" />
            <FieldWrapper id="bericht" label="Bericht" name="response.bericht" type="textarea" component={TextAreaField} />
            <Form.Group>
                <Form.Check>
                    <Form.Check.Input
                        name="privacy"
                        as={Field}
                        type="checkbox"
                        isValid={touched.privacy && !errors.privacy}
                        isInvalid={touched.privacy && Boolean(errors.privacy)}
                    />
                    <Form.Check.Label>
                        Ik ga akkoord met de <a href={privacyStatement} rel="noopener noreferrer" target="_blank"> privacy voorwaarden</a>
                    </Form.Check.Label>
                    <ErrorMessage name="privacy" component={Form.Control.Feedback} />
                </Form.Check>
            </Form.Group>

            <Form.Group className={'text-center'}>
                <RenderCaptcha
                    verifyCallback={(response) => setFieldValue("recaptcha", response)}
                />
            </Form.Group>

            <Form.Group className={'form-buttons'}>
                <Button variant="primary" type="submit" disabled={isSubmitting} >
                    {isSubmitting ? 'Aan het versturen…' : 'Versturen'}
                </Button>
                {status && status.message &&
                <div>{status.message}</div>
                }
            </Form.Group>
        </Form>
    )
}

export default ResponseForm